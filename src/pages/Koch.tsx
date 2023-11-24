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
  Link
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
  startButton: {
    width: '100%'
  },
  link: {
    paddingTop: '20px'
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
    // setDisabled(true)

    const tempArray = []
    let lastChar = ''
    for(let i = 0; i < charCount; i++){
      const selection = kochlevels[level].characters[Math.floor(Math.random()*kochlevels[level].characters.length)]
      if(selection == " " && i == 0){ //Preventing first character from being a space
        i -= 1
      } else if(selection == " " && lastChar == " ") { //Preventing duplicate space entries
        console.log('Duplicate Spaces')
        i -= 1
      } else {
        lastChar = selection
        tempArray.push(selection)
      }
    }
    
    setGenerated(tempArray.join(''))
    console.log(tempArray)
    // Oscillator(tempArray.join(''))
  }

  const checkSolution = () => {
    console.log(`User Input - ${userInput}`)
    console.log(`Game generated - ${generated}`)
  }

  console.log(level)

  return(
    <>
      <Toaster toasterId={toasterId} />
      <div className="content-wrapper">
        <div className="grid-box">
          <Label id="level">Select Level:</Label>
          <Dropdown disabled={disabled} className={styles.dropdownSpacing} id="level" placeholder='Select Level...' onOptionSelect={(e) => setLevel(e.target.textContent)}>
            {Object.keys(kochlevels).map((item) => {
              return(
                <Option key={`${item}`}>{item}</Option>
              )
            })}
          </Dropdown>
          <Label id="time">Select Practice Count:</Label>
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
        <div className="grid-box center">
          <Button className={styles.startButton} disabled={disabled} appearance='primary' onClick={() => generateGame()}>Start Practice</Button>
          <Link className={styles.link} href='https://google.com' target='_blank'>View Levels Chart</Link>
        </div>
        <div className="grid-box grid-col-span-2">
          <Field label="Submit Answers">
            <Textarea className={styles.textArea} onChange={(e) => setUserInput(e.target.value)} value={userInput} />
          </Field>
          <Button disabled={false} appearance='primary' onClick={() => checkSolution()}>Submit Answers</Button>
        </div>
      </div>
    </>
  )
}