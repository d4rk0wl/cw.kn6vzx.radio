import {
  Slider,
  Label,
  Dropdown,
  Option,
  Button,
  Input
} from '@fluentui/react-components';
import { useState } from 'react';
import Hints from '../components/Hints';
import { Oscillator } from '../utilities/Oscillator';
import '../styles/common.scss';

export default function Words():JSX.Element{
  const [ word, setWord ] = useState<string>('')
  const [ wordLength, setwordLength] = useState<number>(4)
  const [ language, setLanguage ] = useState<string>('en')
  const [ disabled, setDisabled ] = useState<boolean>(false)

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

  const checkWord = (userInput:string) => {
    if(userInput === word){
      console.log('correct')
    } else {
      console.log('incorrect')
    }
  }

  return(
    <>
      <div className="page-wrapper">
        <div className="grid-half">
          <Label htmlFor={'wordLength'}>Word Length:&nbsp;{wordLength}</Label>
          <Slider id={'wordLength'} min={2} max={8} defaultValue={4} disabled={disabled} onChange={(e) => setwordLength(Number(e.target.value))} />
          <Label htmlFor={'language'}>Language:</Label>
          <Dropdown id={'language'} placeholder='Select Language' disabled={disabled}>
            <Option>English</Option>
            <Option>Italian</Option>
            <Option>German</Option>
          </Dropdown>
        </div>
        <div className="grid-half buttons">
          <Button appearance='primary' disabled={disabled} onClick={() => getWord()}>New word</Button>
          <Button appearance='secondary' disabled={disabled}>Repeat Word</Button>
        </div>
        <div className="grid-col-span-2 field input">
          <Input size={'large'} id='userInput' placeholder='Enter Word Here' />
          <Button appearance='primary'>Submit</Button>
        </div>
      </div>
    </>
  )
}