import {
  Card,
  makeStyles,
  shorthands
} from '@fluentui/react-components'
import { Oscillator } from '../utilities/Oscillator';

const useStyles = makeStyles({
  historyWrapper: {
    textAlign: 'center',
    ...shorthands.borderTop('1px', 'solid'),
  },
  historyTable: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  historyItem: {
    fontSize: '1.5em',
    display: 'flex',
    justifyContent: 'center',
    ...shorthands.margin('10px')
  },
})

type Props = {
  historyArray: {
    historicalWord: string,
    code: string[],
    description?: string 
  }[]
}

export default function History({historyArray}:Props):JSX.Element{
  const styles = useStyles();

  if(historyArray.length < 1) {
    return(<></>)
  } else {
    return(
      <>
        <div className={styles.historyWrapper}>
          <h1>History:</h1>
          <div className={styles.historyTable}>
            {historyArray.map((item) => {
                return(
                  <div className={styles.historyItem} key={`${item.historicalWord}${Math.random() * 10}`}>
                    <Card onClick={() => Oscillator(item.historicalWord)}>
                      <span>{item.historicalWord.toUpperCase()}{item.description ? ` / ${item.description}` : <></>}</span><span>{item.code.join('')}</span>
                    </Card>
                  </div>
                )
            })}
          </div>
        </div>
      </>
    )
  }
}