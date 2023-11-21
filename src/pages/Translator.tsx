import { useState } from 'react'
import {
  Label,
  Input,
  Button,
  makeStyles,
  shorthands
} from '@fluentui/react-components'
import '../styles/translator.scss'

import { Oscillator, GenerateMorseSync } from '../utilities/Oscillator'
import HintsTable from '../components/HintsTable'
import History from '../components/History'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
    marginTop: '20px',
    maxWidth: '1000px',
  },
  input: {
    fontSize: '2em;',
    paddingTop: '10px;',
    paddingBottom: '10px;',
    textAlign: 'center', //Why doesn't this work?
  },
  submit: {
    maxWidth: '200px'
  }
})

export default function Translator(){
  const [ word, setWord ] = useState<string>('')
  const [ history, setHistory ] = useState<{historicalWord: string, code: string[]}[]>([])
  const styles = useStyles()

  const submit = () => {
    Oscillator(word)
    setHistory(history => [...history, {historicalWord: word, code: GenerateMorseSync(word)}])
  }

  return(
    <>
      <div className={styles.wrapper}>
        <Label className='input-form' size={'large'} htmlFor='input'>Input Words or Sentence to Translate: </Label>
        <Input className='input-word' size={'large'} id={'input'} onChange={(e) => setWord(e.target.value)} />
        <Button className={styles.submit} appearance='primary' onClick={() => submit()}>Translate</Button>
        <History historyArray={history} />
        <HintsTable />
      </div>
    </>
  )
}