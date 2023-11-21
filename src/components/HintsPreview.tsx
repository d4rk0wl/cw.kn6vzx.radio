import {
  makeStyles,
  shorthands
} from '@fluentui/react-components'

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: "2em",
    letterSpacing: '5px',
    ...shorthands.margin('10px')
  },
  correct: {
    color: 'green',
  },
  incorrect: {
    color: 'red'
  }
})

type Props = {
  userInput: string,
  word: string
}

export default function HintsPreview({ userInput, word }:Props):JSX.Element{
  const styles = useStyles();
  const wordArray = word.split('')
  const inputArray = userInput.split('')

  return(
    <>
      <div className={styles.wrapper}>
        {inputArray.map((item, index) => {
          if(item === wordArray[index]){
            return(
              <div className={styles.correct} key={index}>
                {item.toUpperCase()}
              </div>
            )
          } else {
            return(
              <div className={styles.incorrect} key={index}>
                {item.toUpperCase()}
              </div>
            )
          }
        })}
      </div>
    </>
  )
}