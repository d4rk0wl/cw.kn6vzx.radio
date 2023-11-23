const callsignFormat = [
  {format: '1x1', form: 'PNS'},
  {format: '2x1', form: 'PPNS'},
  {format: '1x2', form: 'PNSS'},
  {format: '1x3', form: 'PNSSS'},
  {format: '2x2', form: 'PPNSS'},
  {format: '2x3', form: 'PPNSSS'},
  {format: '2x4', form: 'PPNSSSS'}
]

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'

export {
  callsignFormat,
  letters,
  numbers
}