import alphabet from '../data/alphabet.tsx'

async function GenerateMorse(word:string){
  const morse:string[] = []
  word.split("").forEach((letter:string) => {
    morse.push(alphabet[letter.toLowerCase()])
    if(letter != " "){
      //Intra-character spacing is three dots. The `,` represents the end of a letter so the oscillator function will evaluate the correct timing
      morse.push(',') 
    }
  })
  return morse
}

export async function Oscillator(params:string){
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();
  const dot = 0.065;
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
