import { useState } from 'react'
import {
  Button,
  Label,
  makeStyles
} from '@fluentui/react-components'
import phrases from '../data/phrases'
import { Oscillator, GenerateMorseSync } from '../utilities/Oscillator'
import History from '../components/History'
import MainInput from '../components/MainInput'
import HintsPreview from '../components/HintsPreview'
import HintsTable from '../components/HintsTable'
import '../styles/practice.scss'

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

export default function Phrases(props: Props){
  const [ phrase, setPhrase ] = useState<{code: string, translation: string, description?: string }>({code: '', translation: '', description: ''})
  const [ userInput, setUserInput] = useState<string>('')
  const [ history, setHistory ] = useState<{historicalWord: string, code: string[]}[]>([])
  const [ hintWord, setHintWord ] = useState<string>('')
  
  const styles = useStyles();
  
  const generatePhrase = () => {
    const selection = phrases[Math.floor(Math.random()*phrases.length)]
    setPhrase({code: selection.code, translation: selection.translation})
    Oscillator(selection.code)
    if(window.localStorage.getItem('cheat_mode') == 'true'){
      console.warn(`Cheat Mode Enabled - ${selection.code} : ${selection.translation}`)
    }
  }

  const checkPhrase = () => {
    if(phrase.code === userInput.toUpperCase() && userInput.length > 0){
      props.playSound('success')
      setHistory(history => [...history, {historicalWord: phrase.code, code: GenerateMorseSync(phrase.code), description: phrase.translation}])
      props.toast({type: "success", title: "Correct", message: "You have guessed the phrase correctly!"});
      setHintWord('')
      setUserInput('')
      if(window.localStorage.getItem('auto_play') == 'true'){
        setTimeout(() => {
          generatePhrase()
        }, 1000)
      }
    } else {
      props.playSound('fail')
      props.toast({type: "error", title: "Incorrect!", message: "You have not guessed the phrase correctly"});
      setHintWord(userInput)
      setTimeout(() => {
        Oscillator(phrase.code)
      }, 800)
    }
  }

  return(
    <>
      <div className="content-wrapper">
        <div className="grid-box center">
          <Button appearance='primary' className={styles.mainButton} onClick={() => generatePhrase()}>New Phrase</Button>
        </div>
        <div className="grid-box center">
          <Button appearance='secondary' className={styles.mainButton} onClick={() => Oscillator(phrase.code)}>Repeat Phrase</Button>
        </div>
        {window.localStorage.getItem('hints') == 'true' && hintWord ? <>
          <div className="grid-box center cs-format">
            {hintWord ? <>
              <Label>Phrase Meaning:</Label>
              <h1 className={styles.formatHeading}>{phrase.translation}</h1>
            </> : <></>}
          </div>
          <div className="grid-box center">
            <HintsPreview userInput={hintWord.toUpperCase()} word={phrase.code} />
          </div>
        </> : <></>}
        <div className="grid-box grid-col-span-2 input">
          <MainInput placeholder='Enter Phrase' change={(e) => setUserInput(e.target.value)} submit={() => checkPhrase()} value={userInput} disable={!phrase.code ? true : false} />
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