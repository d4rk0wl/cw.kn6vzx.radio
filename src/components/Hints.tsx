import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableCellLayout
} from '@fluentui/react-components'

import { useEffect } from 'react'
import alphabet from '../data/alphabet'

export default function Hints():JSX.Element{

  useEffect(() => {
    Object.keys(alphabet).forEach((key: keyof typeof alphabet) => {
      console.log(`Key - ${key} : Value - ${alphabet[key]}`)
    })
  }, [])

  return(
    <>
      <div>
        <h1>Hints Table</h1>
      </div>
    </>
  )
}