import { useState } from 'react'
import { 
  Button,
  Label,
  makeStyles
} from '@fluentui/react-components'
import { Oscillator, GenerateMorseSync } from '../utilities/Oscillator';
import HintsPreview from '../components/HintsPreview';
import HintsTable from '../components/HintsTable';
import History from '../components/History';
import { callsignFormat, letters, numbers } from '../data/callsignFormat';
import '../styles/practice.scss'
import MainInput from '../components/MainInput';

type ToastParams = {
  type: "error" | "warning" | "success",
  title: string,
  message: string
}

type Props = {
  toast: ({type, title, message}:ToastParams) => void,
  playSound: (sound: 'success' | 'fail') => void
}

const useStyles = makeStyles({
  mainButton: {
    maxWidth: '200px'
  },
  formatHeading: {
    marginTop: '5px'
  }
})

export default function Callsigns(props: Props) {
  const [ callsign, setCallsign ] = useState<{call: string, form: string}>({call: '', form: ''})
  const [ userInput, setuserInput ] = useState<string>('')
  const [ history, setHistory] = useState<{historicalWord: string, code: string[]}[]>([])
  const [ hintWord, setHintWord ] = useState<string>('')
  const styles = useStyles();

  const generateCallsign = () => {
    const selection = callsignFormat[Math.floor(Math.random()*callsignFormat.length)]
    const callsign: string[] = []
    selection.form.split('').map((item) => {
      if(item === 'P' || item === 'S'){
        callsign.push(letters.split('')[Math.floor(Math.random()*letters.split('').length)])
      } else {
        callsign.push(numbers.split('')[Math.floor(Math.random()*10)])
      }
    })
    setCallsign({call: callsign.join(''), form: selection.format})
    Oscillator(callsign.join(''))
    if(window.localStorage.getItem('cheat_mode') == 'true'){
      console.warn(`Cheat Mode Enabled - ${callsign.join('')}`)
    }
  }

  const checkCallsign = () => {
    if(callsign.call === userInput.toUpperCase() && userInput.length > 0){
      props.playSound('success')
      props.toast({type: "success", title: "Correct", message: "You have guessed the callsign correctly!"});
      setHistory(history => [...history, {historicalWord: callsign.call, code: GenerateMorseSync(callsign.call)}])
      setHintWord('')
      setuserInput('')
      if(window.localStorage.getItem('auto_play') == 'true'){
        setTimeout(() => {
          generateCallsign()
        }, 1000)
      }
    } else {
      props.playSound('fail')
      props.toast({type: "error", title: "Incorrect!", message: "You have not guessed the callsign correctly"});
      setHintWord(userInput)
      setTimeout(() => {
        Oscillator(callsign.call)
      }, 800)
    }
  }
  
  return(
    <>
      <div className='content-wrapper'>
        <div className="grid-box center">
          <Button appearance='primary' className={styles.mainButton} onClick={() => generateCallsign()}>Generate Callsign</Button>
        </div>
        <div className="grid-box center">
          <Button appearance='secondary' className={styles.mainButton} onClick={() => Oscillator(callsign.call)}>Repeat Callsign</Button>
        </div>
        {window.localStorage.getItem('hints') == 'true' && hintWord ? <>
          <div className="grid-box center cs-format">
          {hintWord ? <> 
            <Label>Callsign Format:</Label>
            <h1 className={styles.formatHeading}>{callsign.form}</h1>
          </> : <></>}
          </div>
          <div className="grid-box center">
            <HintsPreview userInput={hintWord.toUpperCase()} word={callsign.call} />
          </div>
        </> : <></>}
        <div className="grid-box grid-col-span-2 input">
          <MainInput placeholder='Enter Callsign' change={(e) => setuserInput(e.target.value)} submit={() => checkCallsign()} value={userInput} disable={!callsign.call ? true : false} />
        </div>
        <div className="grid-box grid-col-span-2">
          <History historyArray={history} />
        </div>
        <div className="grid-box grid-col-span-2">
          {window.localStorage.getItem('hints') == 'true' ? <HintsTable /> : <></>}
        </div>
      </div>
    </>
  )
}