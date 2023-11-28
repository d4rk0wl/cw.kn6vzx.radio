import { useState, useEffect } from 'react';
import { 
  Switch,
  Slider,
  Label,
  Button,
  Tooltip,
  InfoLabel,
  makeStyles
} from '@fluentui/react-components';

import { Save24Regular } from '@fluentui/react-icons';
import '../styles/settings.scss'

const useStyles = makeStyles({
  infoLabel: {
    display: 'flex',
    alignContent: 'center'
  },
  switch: {
    marginRight: '-10px'
  }
})

type ToastParams =  {
  type: "success" | "error" | "warning",
  title: string,
  message: string
}

type Props = {
  setdarkMode: () => void,
  darkMode: boolean,
  toast: ({type, title, message}: ToastParams) => void
}

export function Settings(props: Props):JSX.Element{
  const styles = useStyles()
  const [wpm, setWpm] = useState<number>(20)
  const [farnsworth, setFarnsworth] = useState<number>(0)
  const [tone, setTone] = useState<number>(600)
  const [ volume, setVolume ] = useState<number>(1)
  const [ hints, setHints ] = useState<boolean>(false)
  const [ autoplay, setAutoPlay ] = useState<boolean>(false)
  const [ cheatMode, setCheatMode ] = useState<boolean>(false)
  const [ disabled, setDisabled ] = useState<boolean>(false)

  useEffect(() => {
    setWpm(Number(window.localStorage.getItem('wpm')))
    setFarnsworth(Number(window.localStorage.getItem('farnsworth')) * 2)
    setTone(Number(window.localStorage.getItem('tone')))
    setVolume(Number(window.localStorage.getItem('volume')) * 100)
    setHints((window.localStorage.getItem('hints')) == 'true') //Janky code to convert string to boolean
    setAutoPlay((window.localStorage.getItem('auto_play')) == 'true')
    setCheatMode((window.localStorage.getItem('cheat_mode')) == 'true')
  }, [])

  const saveSettings = ():void => {
    window.localStorage.setItem('wpm', String(wpm))
    window.localStorage.setItem('farnsworth', String(farnsworth / 2))
    window.localStorage.setItem('tone', String(tone))
    window.localStorage.setItem('hints', String(hints))
    window.localStorage.setItem('auto_play', String(autoplay))
    window.localStorage.setItem('cheat_mode', String(cheatMode))
    window.localStorage.setItem('volume', String(volume * 0.01))
    window.localStorage.setItem('darkMode', String(props.darkMode))
    setDisabled(true)
    props.toast({ type: 'success', title: 'Settings Saved', message: 'Settings Saved Successfully'})
  }
  return(
    <>
      <div className="settings">
        <div className='settings-content'>
          <Tooltip positioning={'below'} content="Adjust the Words Per Minute (WPM) of the morse code being played. This is the speed in which characters are transmitted" relationship='description'>
            <Label htmlFor='wpm'>Words per Minute: {wpm}wpm</Label>
          </Tooltip>
          <Slider value={wpm} step={5} min={15} max={40} size={'medium'} onChange={(e) => setWpm(parseInt(e.target.value))} />
          <Tooltip positioning={'below'} content="Adjust the Farnsworth delay between characters. This delay time is interjected between each of the letters or numbers of a transmission" relationship='description'>
            <Label htmlFor='farnsworth'>Farnsworth Delay: {farnsworth / 2}s</Label>
          </Tooltip>
          <Slider value={farnsworth} min={0} max={20} size={'medium'} onChange={(e) => setFarnsworth(parseInt(e.target.value))} />
          <Tooltip positioning={'below'} content="Adjust the tone (Hz) in which the oscillator plays. Some people prefer a lower or higher sine wave tone." relationship='description'>
            <Label htmlFor='tone'>Tone: {tone}hz</Label>
          </Tooltip>
          <Slider value={tone} step={50} min={400} max={1000} size={'medium'} onChange={(e) => setTone(parseInt(e.target.value))} />
          <Tooltip positioning={'below'} content="Adjust the playback volume of the CW oscillator" relationship='description'>
            <Label htmlFor='volume'>Volume: {volume}</Label>
          </Tooltip>
          <Slider value={volume} step={1} min={0} max={100} size={'medium'} onChange={(e) => setVolume(parseInt(e.target.value))} />
          <div className="switch-grid">
            <div className="settings-grid-box">
              <Switch className={styles.switch} label={`Dark Theme`} onChange={() => props.setdarkMode()} checked={props.darkMode} />
            </div>
            <div className="settings-grid-box">
              <InfoLabel className={styles.infoLabel} info={"When practicing words/callsigns/phrases, automatically play the next word without needing to lift your hands from the keyboard"}>
                <Switch className={styles.switch} label={"Auto Play"} onChange={() => setAutoPlay(!autoplay)} checked={autoplay} />
              </InfoLabel>
            </div>
            <div className="settings-grid-box">
              <InfoLabel className={styles.infoLabel} info={"Shows a helpful morse code chart along with displaying the incorrect letters"}>
                <Switch className={styles.switch} label={"Hints"} onChange={() => setHints(!hints)} checked={hints} />
              </InfoLabel>
            </div>
            <div className="settings-grid-box">
              <InfoLabel className={styles.infoLabel} info={"Tisk tisk tisk... This enables the solution to be displayed in the developer console 🤦"}>
                <Switch className={styles.switch} label={"Cheat Mode"} onChange={() => setCheatMode(!cheatMode)} checked={cheatMode} />
              </InfoLabel>
            </div>
          </div>
          <Button disabled={disabled} className='.save' appearance='primary' icon={<Save24Regular />} onClick={() => saveSettings()}>Save Settings</Button>
        </div>
      </div>
    </>
  )
}

export function setDefault():void{ 
  if(!window.localStorage.saved_settings){
    window.localStorage.setItem('wpm', '20')
    window.localStorage.setItem('farnsworth', '0')
    window.localStorage.setItem('tone', '600')
    window.localStorage.setItem('hints', 'true')
    window.localStorage.setItem('saved_settings', 'true')
    window.localStorage.setItem('auto_play', 'true')
    window.localStorage.setItem('cheat_mode', 'false')
    window.localStorage.setItem('volume', '0.9')
    window.localStorage.setItem('darkMode', 'true')
  }
}
