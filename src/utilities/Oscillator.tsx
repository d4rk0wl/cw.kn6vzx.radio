import alphabet from '../data/alphabet.tsx'

export function GenerateMorseSync(word:string){
  const morse:string[] = []
  word.split("").forEach((letter:string) => {
    const letterSelection = alphabet[letter.toLocaleLowerCase() as keyof object]
    if(letterSelection != undefined){
      morse.push(letterSelection)
    }
  })
  return morse
}

async function GenerateMorse(word:string){
  const morse:string[] = []
  word.split("").forEach((letter:string) => {
    const letterSelection = alphabet[letter.toLowerCase() as keyof object]
    if (letterSelection != undefined){ //Checking for letters not in morse alphabet
      morse.push(letterSelection)
      if(letter != " "){
        morse.push(',') //Intra character spacing needed between letters
      }
    }
  })
  return morse
}

//Convert saved setting to MS... Should probably figure out a better way to do this.
async function convertSettings():Promise<number> {
  switch(window.localStorage.getItem('wpm')){
    case '15':
      return 0.065
      break;
    case '20':
      return 0.060
      break;
    case '25':
      return 0.055
      break;
    case '30':
      return 0.050
      break;
    case '35':
      return 0.045
      break;
    case '40':
      return 0.040
      break;
    default:
      return 0.060
      break;
  }
}

export async function Oscillator(params:string){
  const AudioContext = window.AudioContext
  const ctx = new AudioContext();
  const dot = await convertSettings();
  let t = ctx.currentTime;
  const farnsworth = Number(window.localStorage.getItem('farnsworth'))


  const oscillator = ctx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = Number(window.localStorage.getItem('tone'));

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, t);

  const word = await GenerateMorse(params)

  word.forEach(function(letter:string) {
    const code = letter.split('')
    code.forEach((symbol) => {
      switch(symbol){
        case ".":
          gainNode.gain.setValueAtTime(1, t);
          t += dot;
          gainNode.gain.setValueAtTime(0, t);
          t += dot;
          break;
        case "-":
          gainNode.gain.setValueAtTime(1, t);
          t += 3 * dot;
          gainNode.gain.setValueAtTime(0, t);
          t += dot;
          break;
        case " ":
          t += 7 * dot;
          break;
        case ",":
          t += (3 * dot) + farnsworth
          break;
      }
    })
  });

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();

  return false;
}
