import { useState } from 'react'
import {
  Label,
} from '@fluentui/react-components'

import { Oscillator, GenerateMorseSync } from '../utilities/Oscillator'
import MainInput from '../components/MainInput'
import HintsTable from '../components/HintsTable'
import History from '../components/History'

import '../styles/practice.scss'

type ToastParams = {
  type: "error" | "success" | "warning",
  title: string,
  message: string
}

type Props = {
  toast: ({type, title, message}: ToastParams) => void
}

export default function Translator({toast}: Props){
  const [ word, setWord ] = useState<string>('')
  const [ history, setHistory ] = useState<{historicalWord: string, code: string[]}[]>([])

  const submit = () => {
    if(!word){
      toast({type: 'error', title: 'Error!', message: 'Please enter some text to translate'})
      return
    }
    Oscillator(word)
    setHistory(history => [...history, {historicalWord: word, code: GenerateMorseSync(word)}])
  }

  return(
    <>
      <div className="content-wrapper">
        <div className="grid-box grid-col-span-2">
          <Label className='input-form' size={'large'} htmlFor='input'>Input Words or Sentence to Translate: </Label>
          <MainInput change={(e) => setWord(e.target.value)} value={word} placeholder='Enter Word or Phrase' submit={() => submit()} disable={false} />
        </div>
        <div className="grid-box grid-col-span-2">
          <History historyArray={history} />
        </div>
        <div className="grid-box grid-col-span-2">
          <HintsTable />
        </div>
      </div>
    </>
  )
}