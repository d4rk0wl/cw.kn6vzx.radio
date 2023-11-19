import { useState, useEffect } from 'react';
import { 
  Switch,
  Slider,
  Label,
  Button
} from '@fluentui/react-components';
import { Save24Regular } from '@fluentui/react-icons';
import '../styles/settings.scss'

interface Props {
  setdarkMode: () => void,
  darkMode: boolean
}

export function Settings({setdarkMode, darkMode}:Props):JSX.Element{
  const [wpm, setWpm] = useState<number>(20)
  const [farnsworth, setFarnsworth] = useState<number>(0)
  const [tone, setTone] = useState<number>(600)
  const [ hints, setHints ] = useState<boolean>(false)
  const [ loading, setLoading ] = useState<boolean>(false)

  useEffect(() => {
    setWpm(Number(window.localStorage.getItem('wpm')))
    setFarnsworth(Number(window.localStorage.getItem('farnsworth')))
    setTone(Number(window.localStorage.getItem('tone')))
    setHints(JSON.parse(window.localStorage.getItem('hints')))
    console.log('here')
  }, [])

  const saveSettings = ():void => {
    window.localStorage.setItem('wpm', String(wpm))
    window.localStorage.setItem('farnsworth', String(farnsworth))
    window.localStorage.setItem('tone', String(tone))
    window.localStorage.setItem('hints', String(hints))
  }

  return(
    <>
      <div className="settings">
        <div className={loading ? "settings-content loading" : "settings-content"}>
          <Label htmlFor='wpm'>Words per Minute: {wpm}wpm</Label>
          <Slider value={wpm} min={15} max={40} size={'medium'} onChange={(e) => setWpm(parseInt(e.target.value))} />
          <Label htmlFor='farnsworth'>Farnsworth Delay: {farnsworth}s</Label>
          <Slider value={farnsworth} min={0} max={10} size={'medium'} onChange={(e) => setFarnsworth(parseInt(e.target.value))} />
          <Label htmlFor='tone'>Tone: {tone}hz</Label>
          <Slider value={tone} step={50} min={400} max={1000} size={'medium'} onChange={(e) => setTone(parseInt(e.target.value))} />
          <div className="switch-row">
            <Switch label={"Dark Mode"} onChange={() => setdarkMode()} checked={darkMode} />
            <Switch label={"Hints"} onChange={() => setHints(!hints)} checked={hints} />
          </div>
          <Button className='.save' appearance='primary' icon={<Save24Regular />} onClick={() => saveSettings()}>Save Settings</Button>
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
  }
}
