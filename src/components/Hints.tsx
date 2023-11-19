import {
  Card
} from '@fluentui/react-components'
import '../styles/hints.scss'
import alphabet from '../data/alphabet'
import { Oscillator } from '../utilities/Oscillator'

export default function Hints():JSX.Element{
  return(
    <>
      <div className='hint-table'>
        <div className="title">
          <h1>Hints Table:</h1>
        </div>
        <div className='hint-wrapper'>
          {Object.entries(alphabet).map((item) => {
            if(item[0] !== " "){
              return(
                <Card key={item[0]} onClick={() => Oscillator(item[0])}>
                  <div className='hint-cell'>
                    <span>{item[0]}:</span>
                    <span className='hint-code'>{item[1]}</span>
                  </div>
                </Card>
              )
            }
          })}
        </div>
      </div>
    </>
  )
}

/*
@TODO -
  Fix table breakpoints and padding of cards
*/