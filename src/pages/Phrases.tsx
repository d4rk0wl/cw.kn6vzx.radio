import { useState } from 'react'
import {
  Button,
  Label,
  makeStyles,
  Toaster,
  Toast,
  ToastTitle,
  ToastBody,
  useToastController,
  useId
} from '@fluentui/react-components'
import phrases from '../data/phrases'
//@ts-expect-error Incorrect exports file on NPM package
import useSound from 'use-sound' 
import fail from '../assets/fail.wav'
import success from '../assets/success.wav'
import { Oscillator, GenerateMorseSync } from '../utilities/Oscillator'
import History from '../components/History'
import MainInput from '../components/MainInput'
import HintsPreview from '../components/HintsPreview'
import HintsTable from '../components/HintsTable'
import '../styles/practice.scss'

type toastType =  {
  type: "success" | "error" | "warning",
  title: string,
  message: string
}


const useStyles = makeStyles({
  mainButton: {
    maxWidth: '200px'
  },
  formatHeading: {
    marginTop: '5px'
  }
})

export default function Phrases(){
  const toasterId = useId('toaster')
  const { dispatchToast } = useToastController(toasterId)
  const [ phrase, setPhrase ] = useState<{code: string, translation: string, description?: string }>({code: '', translation: '', description: ''})
  const [ userInput, setUserInput] = useState<string>('')
  const [ history, setHistory ] = useState<{historicalWord: string, code: string[]}[]>([])
  const [ hintWord, setHintWord ] = useState<string>('')
  
  const [failEffect] = useSound(fail)
  const [successEffect] = useSound(success)
  const styles = useStyles();

  const notify = ({ type, title, message}:toastType):void => {
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
        <ToastBody>{message}</ToastBody>
      </Toast>,
      { position: 'top-end', intent: type}
    )
  }
  
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
      successEffect()
      setHistory(history => [...history, {historicalWord: phrase.code, code: GenerateMorseSync(phrase.code), description: phrase.translation}])
      notify({type: "success", title: "Correct", message: "You have guessed the phrase correctly!"});
      setHintWord('')
      setUserInput('')
      if(window.localStorage.getItem('auto_play') == 'true'){
        setTimeout(() => {
          generatePhrase()
        }, 1000)
      }
    } else {
      console.log('Why is this here')
      failEffect()
      notify({type: "error", title: "Incorrect!", message: "You have not guessed the phrase correctly"});
      setHintWord(userInput)
      setTimeout(() => {
        Oscillator(phrase.code)
      }, 800)
    }
  }

  return(
    <>
      <Toaster toasterId={toasterId} />
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