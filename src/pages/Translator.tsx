import { useState } from 'react'
import {
  Label,
  Input,
  Button
} from '@fluentui/react-components'
import '../styles/translator.scss'

import { Oscillator } from '../utilities/Oscillator'
import Hints from '../components/Hints'

export default function Translator(){
  const [ word, setWord ] = useState<string>()
  
  const submit = () => {
    console.log(word)
    Oscillator(word)
  }

  return(
    <>
      <div className='wrapper'>
        <div className='input-test'>
          <Label className='input-form' size={'large'} htmlFor='input'>Input Word: </Label>
          <Input className='input-word' size={'large'} id={'input'} onChange={(e) => setWord(e.target.value)} />
        </div>
        <Button appearance='primary' onClick={() => submit()}>Submit</Button>
        <Hints />
      </div>
    </>
  )
}