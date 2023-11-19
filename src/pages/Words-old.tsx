import {
  Slider,
  Label,
  Dropdown,
  Option,
  Button,
  Input,
  makeStyles
} from '@fluentui/react-components';
import { useState } from 'react';
import Hints from '../components/Hints';
import Alert from '../components/Alert';
import { Oscillator } from '../utilities/Oscillator';
import '../styles/common.scss';

const useStyles = makeStyles({
  root: {
    maxWidth: '500px;',
    width: '100%;',
  },
  dropdown: {
    width: 'auto'
  }
})

export default function Words():JSX.Element{
  const [ word, setWord ] = useState<string>('')
  const [ userInput, setuserInput ] = useState<string>('')
  const [ wordLength, setwordLength] = useState<number>(4)
  const [ language, setLanguage ] = useState<string>('en')
  const [ disabled, setDisabled ] = useState<boolean>(false)

  const styles = useStyles();

  const languageSelection = (selection:string):void =>{
    switch(selection){
      case 'English':
        setLanguage('en')
        break;
      case 'Italian':
        setLanguage('it')
        break;
      case 'German':
        setLanguage('de')
        break;
    }
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

  const checkWord = () => {
    console.log(`UserInput - ${userInput} : Word - ${word}`)
    if(userInput.toLocaleLowerCase() === word){
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
          <Button appearance='secondary' disabled={disabled} onClick={() => Oscillator(word)}>Repeat Word</Button>
        </div>
        <div className="grid-col-span-2 field input">
          <Input className={styles.root} size={'large'} id='userInput' placeholder='Enter Word Here' onChange={(e) => setuserInput(e.target.value)} />
          <Button appearance='primary' onClick={() => checkWord()}>Submit</Button>
        </div>
        <div className="grid-col-span-2">
          <Alert />
        </div>
        <div className="grid-col-span-2">
          {localStorage.getItem('hints') === 'true' ? <Hints /> : ''}
        </div>
      </div>
    </>
  )
}

/*
@TODO:
  Break out styles into separate file.
  Clean up CSS/SASS
  Make dropdown select actual language
*/