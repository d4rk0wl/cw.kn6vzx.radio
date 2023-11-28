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
          //Catch if statement for if more characters are entered than the word length... This can probably be cleaned up later
          if(index >= wordArray.length){
            return(
              <div className={styles.incorrect} key={index}>
                {item.toUpperCase()}
              </div>
            )
          }

          if(item.toUpperCase() === wordArray[index].toUpperCase()){
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