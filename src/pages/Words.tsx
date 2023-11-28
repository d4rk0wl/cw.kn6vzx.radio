import { useState } from 'react';
import {
  Label,
  Slider,
  Dropdown,
  Option,
  Button,
} from '@fluentui/react-components';

import HintsTable from '../components/HintsTable';
import HintsPreview from '../components/HintsPreview';
import History from '../components/History';
import { Oscillator, GenerateMorseSync } from '../utilities/Oscillator';
import MainInput from '../components/MainInput';

import '../styles/practice.scss';

type ToastParams = {
  type: "error" | "warning" | "success",
  title: string,
  message: string
}

type Props = {
  toast: ({type, title, message}:ToastParams) => void,
  playSound: (sound: 'success' | 'fail') => void
}

export default function Words(props: Props){
  const [ wordLength, setwordLength ] = useState<number>(4)
  const [ language, setLanguage ] = useState<string>('en')
  const [ disabled, setDisabled ] = useState<boolean>()
  const [ word, setWord ] = useState<string>('')
  const [ userInput, setuserInput ] = useState<string>('')

  const [ history, setHistory ] = useState<{historicalWord: string, code: string[]}[]>([])
  const [ hintWord, sethintWord ] = useState<string>('')

  const getWord = ():void => {
    setDisabled(true)
    fetch(`https://random-word-api.herokuapp.com/word?length=${wordLength}&lang=${language}`)
    .then(res => res.json())
    .then(data => {
      setWord(data[0])
      Oscillator(data[0])
      setDisabled(false)
      if(window.localStorage.getItem('cheat_mode') == 'true'){
        console.warn(`Cheat Mode Enabled - ${data[0]}`)
      }
    })
  }

  const checkWord = ():void => {
    if(userInput.toLowerCase() == word && userInput.length > 0) {
      props.playSound('success')
      props.toast({type: "success", title: "Correct", message: "You have guessed the word correctly!"});
      setHistory(history => [...history, {historicalWord: word, code: GenerateMorseSync(word)}])
      clearAll()
      if(window.localStorage.getItem('auto_play') == 'true'){
        setTimeout(() => {
          getWord()
        }, 1000)
      }
    } else {
      props.playSound('fail')
      sethintWord(userInput)
      props.toast({type: "error", title: "Incorrect!", message: "You have not guessed the word correctly"});
      setTimeout(() => {
        Oscillator(word)
      }, 800)
    }
  }

  const clearAll = () => {
    sethintWord('')
    setuserInput('')
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

  return(
    <>
      <div className="content-wrapper">
        <div className='grid-box'>
          <Label htmlFor={'wordLength'}>Word Length:&nbsp;{wordLength}</Label>
          <Slider id={'wordLength'} min={2} max={8} defaultValue={4} disabled={disabled} onChange={(e) => setwordLength(Number(e.target.value))} />
          <Label htmlFor={'language'}>Language:</Label>
          {/*@ts-expect-error Poor documentation FluentUI 2 frame word does not explain error*/}
          <Dropdown id={'language'} disabled={disabled} defaultValue={'English'} defaultSelectedOptions={['English']} onOptionSelect={(e) => changeLanguage(e.target.textContent)}>
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
          {window.localStorage.getItem('hints') == 'true' ? <HintsPreview userInput={hintWord} word={word} /> : <></>}
          <MainInput placeholder='Enter Word' change={(e) => setuserInput(e.target.value)} submit={() => checkWord()} value={userInput} disable={!word ? true : false} />
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