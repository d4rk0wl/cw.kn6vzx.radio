import { useState } from 'react'
import {
  Textarea,
  Field,
  Label,
  Dropdown,
  Option,
  Button,
  makeStyles,
  Toaster,
  Toast,
  ToastTitle,
  ToastBody,
  useToastController,
  useId,
  Body2,
  shorthands,
  Tooltip
} from '@fluentui/react-components'
import kochlevels from '../data/kochlevels'
import { Oscillator } from '../utilities/Oscillator'
import '../styles/practice.scss'

const useStyles = makeStyles({
  textArea: {
    height: '175px',
    fontSize: '1em' //Why doesn't this work
  },
  dropdownSpacing: {
    marginBottom: '15px'
  },
  solution: {
    textAlign: 'center',
  },
  solutionHeading: {
    ...shorthands.borderBottom('1px', 'solid')
  },
  wideSpacing: {
    letterSpacing: '2px'
  },
  correct: {
    backgroundColor: 'green',
    ...shorthands.margin('2px')
  },
  incorrect: {
    backgroundColor: 'red',
    ...shorthands.margin('2px')
  }
})

type toastType = {
  type: "success" | "error" | "warning",
  title: string,
  message: string
}

export default function Koch(){
  const toasterId = useId('toaster')
  const { dispatchToast } = useToastController(toasterId)
  const [userInput, setUserInput] = useState<string>('')
  const [level, setLevel] = useState<number>()
  const [charCount, setCharCount ] = useState<number>()
  const [disabled, setDisabled] = useState<boolean>(false)
  const [ solution, setSolution ] = useState<boolean>(false)
  const [generated, setGenerated] = useState<string>('')
  const styles = useStyles()

  const notify = ({ type, title, message}:toastType):void => {
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
        <ToastBody>{message}</ToastBody>
      </Toast>,
      { position: 'top-end', intent: type}
    )
  }
  
  const generateGame = () => {
    if(charCount == undefined || level == undefined){
      notify({title: "Error", message: 'Please select both level and character count', type: 'error'})
      return
    }
    setDisabled(true)
    const tempArray = []
    let lastChar = ''
    for(let i = 0; i < charCount; i++){
      const selection = kochlevels[level].characters[Math.floor(Math.random()*kochlevels[level].characters.length)]
      if(selection == " " && i == 0){ //Preventing first character from being a space
        i -= 1
      } else if(selection == " " && lastChar == " ") { //Preventing duplicate space entries
        i -= 1
      } else {
        lastChar = selection
        tempArray.push(selection)
      }
    }
    
    setGenerated(tempArray.join(''))
    Oscillator(tempArray.join(''))
  }

  const checkSolution = () => {
    setSolution(true)
  }

  const reset = () => {
    setUserInput('')
    setGenerated('')
    setSolution(false)
    setDisabled(false)
  }

  return(
    <>
      <Toaster toasterId={toasterId} />
      <div className="content-wrapper">
        <div className="grid-box">
          <Label id="level">Select Level:</Label>
          {/*@ts-expect-error Poor documentation FluentUI 2 frame word does not explain error*/}
          <Dropdown disabled={disabled} className={styles.dropdownSpacing} id="level" placeholder='Select Level...' onOptionSelect={(e) => setLevel(e.target.textContent)}>
            {Object.keys(kochlevels).map((item, index) => {
              console.log(item)
              return(
                <Tooltip content={<span className={styles.wideSpacing}>{kochlevels[index].characters.join('').toUpperCase()}</span>} relationship='description'>
                  <Option key={`${item}`}>{item}</Option>
                </Tooltip>
              )
            })}
          </Dropdown>
          <Label id="time">Select Practice Count:</Label>
          {/*@ts-expect-error Poor documentation FluentUI 2 frame word does not explain error*/}
          <Dropdown disabled={disabled} className={styles.dropdownSpacing} id="time" placeholder='Select Time...' onOptionSelect={(e) => setCharCount(e.target.textContent)}>
            <Option text='20 Characters'>20</Option>
            <Option text='30 Characters'>30</Option>
            <Option text='40 Characters'>40</Option>
            <Option text='50 Characters'>50</Option>
            <Option text='60 Characters'>60</Option>
            <Option text='70 Characters'>70</Option>
            <Option text='80 Characters'>80</Option>
            <Option text='90 Characters'>90</Option>
            <Option text='100 Characters'>100</Option>
          </Dropdown>
        </div>
        <div className="grid-box">
          <Button disabled={disabled} appearance='primary' onClick={() => generateGame()}>Start Practice</Button>
          <Button disabled={!disabled} appearance='secondary' onClick={() => reset()}>Reset Game</Button>
        </div>
        <div className="grid-box grid-col-span-2">
          <Field label="Submit Answers">
            <Textarea disabled={solution} className={styles.textArea} onChange={(e) => setUserInput(e.target.value)} value={userInput} />
          </Field>
          <Button disabled={!disabled} appearance='primary' onClick={() => checkSolution()}>Submit Answers</Button>
        </div>
        {solution ? <>
          <div className="grid-box">
            <div className={styles.solution}>
              <h2 className={styles.solutionHeading}>Answer:</h2>
              <Body2 className={styles.wideSpacing}>
                {generated.toUpperCase()}
              </Body2>
            </div>
          </div>
          <div className="grid-box">
            <div className={styles.solution}>
              <h2 className={styles.solutionHeading}>Player Input:</h2>
              <Body2 className={styles.wideSpacing}>
                {userInput.split('').map((item, index) => {
                  if(item.toLowerCase() === generated.split('')[index]) {
                    return(
                      <span className={styles.correct} key={index}>{item.toUpperCase()}</span>
                    )
                  } else {
                    return(
                      <span className={styles.incorrect} key={index}>{item.toUpperCase()}</span>
                    )
                  }
                })}
              </Body2>
            </div>
          </div>
        </> : <></>}
      </div>
    </>
  )
}