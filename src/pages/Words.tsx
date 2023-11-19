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
  useId,
} from '@fluentui/react-components'
import { useState } from 'react'
import Hints from '../components/Hints'
import { Oscillator } from '../utilities/Oscillator'
import '../styles/practice.scss'

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

export default function Testing(){
  const toasterId = useId('toaster')
  const { dispatchToast } = useToastController(toasterId)
  const [ wordLength, setwordLength ] = useState<number>(4)
  const [ language, setLanguage ] = useState<string>('en')
  const [ disabled, setDisabled ] = useState<boolean>()
  const [ word, setWord ] = useState<string>()
  const [ userInput, setuserInput ] = useState<string>()

  const notify = (type:string, title:string, message:string ):void => {
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
        <ToastBody>{message}</ToastBody>
      </Toast>,
      { position: 'top-end', intent: `${type}`}
    )
  }

  const getWord = ():void => {
    setDisabled(true)
    fetch(`https://random-word-api.herokuapp.com/word?length=${wordLength}&lang=${language}`)
    .then(res => res.json())
    .then(data => {
      console.log(data[0])
      setWord(data[0])
      Oscillator(data[0])
      setDisabled(false)
    })
  }

  const checkWord = ():void => {
    if(userInput?.toLocaleLowerCase() == word) {
      console.log('correct')
      notify('success', 'Correct!', 'You have guessed the word correctly.');
    } else {
      notify('error', 'Incorrect!', 'You have not guessed the word correctly.');
    }
  }

  const styles = useStyles();

  return(
    <>
      <Toaster toasterId={toasterId} />
      <div className="content-wrapper">
        <div className='grid-box'>
          <Label htmlFor={'wordLength'}>Word Length:&nbsp;{wordLength}</Label>
          <Slider id={'wordLength'} min={2} max={8} defaultValue={4} disabled={disabled} onChange={(e) => setwordLength(Number(e.target.value))} />
          <Label htmlFor={'language'}>Language:</Label>
          <Dropdown id={'language'} placeholder='Select Language' disabled={disabled}>
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
          <Input className={styles.input} size={'large'} id='userInput' placeholder='Enter Word Here' onChange={(e) => setuserInput(e.target.value)} />
          <Button className={styles.submit} appearance='primary' onClick={() => checkWord()}>Submit</Button>
        </div>
        <div className="grid-box grid-col-span-2">
          {window.localStorage.getItem('hints') == 'true' ? <Hints /> : <></>}
        </div>
      </div>
    </>
  )
}