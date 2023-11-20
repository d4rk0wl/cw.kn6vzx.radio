import {
  Label,
  Slider,
  Dropdown,
  Option,
  Button,
  Input,
  makeStyles,
  Toaster,
  Toast,
  ToastTitle,
  ToastBody,
  useToastController,
  useId
} from '@fluentui/react-components';
import useSound from 'use-sound';
import { useState } from 'react';
import HintsTable from '../components/HintsTable';
import HintsPreview from '../components/HintsPreview';
import History from '../components/History';
import { Oscillator, GenerateMorseSync } from '../utilities/Oscillator';
import '../styles/practice.scss';
import fail from '../assets/fail.wav';
import success from '../assets/success.wav';

const useStyles = makeStyles({
  submit: {
    maxWidth: '100px;',
    marginLeft: 'calc(50% - 50px);'
  },
  input: {
    fontSize: '2em;',
    paddingTop: '10px;',
    paddingBottom: '10px;',
  }
})

interface toastType {
  type: "success" | "error" | "warning",
  title: string,
  message: string
}


export default function Testing(){
  const toasterId = useId('toaster')
  const { dispatchToast } = useToastController(toasterId)
  const [ wordLength, setwordLength ] = useState<number>(4)
  const [ language, setLanguage ] = useState<string>('en')
  const [ disabled, setDisabled ] = useState<boolean>()
  const [ word, setWord ] = useState<string>('')
  const [ userInput, setuserInput ] = useState<string>('')
  const [ history, setHistory ] = useState<object[]>([])

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

  const getWord = ():void => {
    setDisabled(true)
    fetch(`https://random-word-api.herokuapp.com/word?length=${wordLength}&lang=${language}`)
    .then(res => res.json())
    .then(data => {
      setuserInput('')
      console.log(data[0])
      setWord(data[0])
      Oscillator(data[0])
      setDisabled(false)
    })
  }

  const checkWord = ():void => {
    if(userInput?.toLocaleLowerCase() == word) {
      successEffect();
      notify({type: "success", title: "Correct", message: "You have guessed the word correctly!"});
      setHistory(history => [...history, {word, code: GenerateMorseSync(word)}])
    } else {
      failEffect();
      notify({type: "error", title: "Incorrect!", message: "You have not guessed the word correctly"});
    }
  }

  const changeLanguage = (event: string):void => {
    switch(event){
      case 'English':
        setLanguage('en');
        break;
      case 'Italian':
        setLanguage('it')
        break;
      case 'German':
        setLanguage('de')
        break;
    }
  }

  console.log(language)

  return(
    <>
      <Toaster toasterId={toasterId} />
      <div className="content-wrapper">
        <div className='grid-box'>
          <Label htmlFor={'wordLength'}>Word Length:&nbsp;{wordLength}</Label>
          <Slider id={'wordLength'} min={2} max={8} defaultValue={4} disabled={disabled} onChange={(e) => setwordLength(Number(e.target.value))} />
          <Label htmlFor={'language'}>Language:</Label>
          <Dropdown id={'language'} placeholder='Select Language' disabled={disabled} defaultSelectedOptions={['English']} onOptionSelect={(e) => changeLanguage(e.target.textContent)}>
            <Option>English</Option>
            <Option>Italian</Option>
            <Option>German</Option>
          </Dropdown>
        </div>
        <div className='grid-box buttons'>
          <Button appearance='primary' disabled={disabled} onClick={() => getWord()}>New word</Button>
          <Button appearance='secondary' disabled={disabled} onClick={() => Oscillator(word!)}>Repeat Word</Button>
        </div>
        <div className='grid-box grid-col-span-2 input'>
          <HintsPreview userInput={userInput} word={word} />
          <Input className={styles.input} size={'large'} id='userInput' placeholder='Enter Word Here' onChange={(e) => setuserInput(e.target.value)} />
          <Button className={styles.submit} appearance='primary' onClick={() => checkWord()}>Submit</Button>
        </div>
        <div className="grid-box grid-col-span-2">
          <History historyArray={history}/>
        </div>
        <div className="grid-box grid-col-span-2">
          {window.localStorage.getItem('hints') == 'true' ? <HintsTable /> : <></>}
        </div>
      </div>
    </>
  )
}