import {
  Card,
  makeStyles,
  shorthands
} from '@fluentui/react-components'
import alphabet from '../data/alphabet'
import { Oscillator } from '../utilities/Oscillator'

const useStyles = makeStyles({
  hintWrapper: {
    textAlign: 'center',
    ...shorthands.border('1px', 'solid'),
    ...shorthands.borderRadius('10px')
  },
  hintTable: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  hintItem: {
    width: '125px',
    ...shorthands.margin('10px')
  },
  hintCell: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.5em'
  }
})

export default function HintsTable():JSX.Element{
  const styles = useStyles();
  return(
    <>
      <div className={styles.hintWrapper}>
        <h1>Hints:</h1>
        <div className={styles.hintTable}>
          {Object.entries(alphabet).map((item) => {
            if(item[0] !== " "){
              return(
                <div key={item[0]} className={styles.hintItem}>
                  <Card onClick={() => Oscillator(item[0])}>
                    <div className={styles.hintCell}>
                      <span>{item[0]}:</span>
                      <span className='hint-code'>{item[1]}</span>
                    </div>
                  </Card>
                </div>
              )
            }
          })}
        </div>
      </div>
    </>
  )
}