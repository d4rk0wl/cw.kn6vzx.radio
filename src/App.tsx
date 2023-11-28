import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
  useThemeClassName,
  makeStyles,
  Link,
  shorthands,
  Tooltip,
  Toaster,
  Toast,
  ToastTitle,
  ToastBody,
  useToastController,
  useId
} from '@fluentui/react-components'

import { Rss24Regular, 
  QuestionCircle24Regular,
  GridDots28Regular 
} from '@fluentui/react-icons';

//@ts-expect-error Incorrect exports file on NPM package
import useSound from 'use-sound';
import fail from './assets/fail.wav';
import success from './assets/success.wav';

import './styles/app.scss'
import LogoTest from './components/Logo';
import Help from './components/Help';
import Sidenav from './components/Sidenav';

import Default from './pages/Default';
import Words from './pages/Words';
import Callsigns from './pages/Callsigns';
import Phrases from './pages/Phrases';
import Koch from './pages/Koch';
import Translator from './pages/Translator';
import { Settings, setDefault} from './pages/Settings';

function ApplyToBody() {
  const classes = useThemeClassName();
  
  useEffect(() => {
    const classList = classes.split(" ");
    document.body.classList.add(...classList);
    return () => document.body.classList.remove(...classList);
  }, [classes]);
  
  return null;
}

const useStyles = makeStyles({
  topIcons: {
    cursor: 'pointer'
  },
  iconLink: {
    color: 'inherit',
    ...shorthands.textDecoration('underline')
  }
})

type toastType =  {
  type: "error" | "warning" | "success"
  title: string,
  message: string
}

function App() {
  const toasterId = useId('toaster')
  const { dispatchToast } = useToastController(toasterId)
  const [ darkMode, setdarkMode ] = useState<boolean>(false)
  const [ mobileNav, setmobileNav ] = useState<boolean>(false)
  const [ helpModal, sethelpModal ] = useState<boolean>(false)
  const styles = useStyles();

  useEffect(() => {
    setDefault()
    setdarkMode(window.localStorage.getItem('darkMode') == 'true')
  }, [])

  const notify = ({ type, title, message}:toastType):void => {
    dispatchToast(
      <Toast>
        <ToastTitle>{title}</ToastTitle>
        <ToastBody>{message}</ToastBody>
      </Toast>,
      { position: 'top-end', intent: type}
    )
  }

  const [failEffect] = useSound(fail)
  const [successEffect] = useSound(success)
  const playSound = (sound: 'success' | 'fail') => {
    if(sound === 'success'){
      successEffect();
    } else {
      failEffect()
    }
  }

  return (
    <>
      <FluentProvider theme={darkMode ? webDarkTheme : webLightTheme}>
        <ApplyToBody />
        <Toaster toasterId={toasterId} />
        <div className="app modal">
          <div className="topnav">
            <div className="topnav-content">
              <div className="topnav-title">
                <div className="menu">
                  <GridDots28Regular onClick={() => setmobileNav(true)} />
                </div>
                <h1 style={{ cursor: 'pointer'}} onClick={() => window.location.pathname='/'}><i>KN6VZX</i> CW Practice</h1>
                <span style={{ cursor: 'pointer '}} className='logo' onClick={() => window.location.pathname="/"}>
                  <LogoTest darkMode={darkMode} />
                </span>
              </div>
              <div className="topnav-links">
                <Tooltip content={"Show help panel"} relationship='description'>
                  <QuestionCircle24Regular className={styles.topIcons} onClick={() => sethelpModal(true)} />
                </Tooltip>
                <Tooltip content={"Visit the blog"} relationship='description'>
                  <Link className={styles.iconLink} target="_blank" href="https://kn6vzx.radio" aria-label='Link to the blog'><Rss24Regular className={styles.topIcons} /></Link>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className={mobileNav ? "sidenav open" : "sidenav close"}>
            <div className="sticky-wrapper">
              <div className="sidenav-close" onClick={() => setmobileNav(false)}>&#x2715;</div>
              <div className="sidenav-content">
                <Sidenav closeMobile={() => setmobileNav(false)} />
              </div>
            </div>
          </div>
          <div className="main">
            <Routes>
              <Route path="/" element={<Default />} />
              <Route path="/words" element={<Words toast={notify} playSound={playSound} />} />
              <Route path="/phrases" element={<Phrases toast={notify} playSound={playSound} />} />
              <Route path="/callsigns" element={<Callsigns toast={notify} playSound={playSound}/>} />
              <Route path="/koch" element={<Koch toast={notify} />} />
              <Route path="/translator" element={<Translator toast={notify} /> } />
              <Route path="/settings" element={<Settings darkMode={darkMode} setdarkMode={() => setdarkMode(!darkMode)} toast={notify}/>} />
              <Route path="*" element={<Default />} />
            </Routes>
          </div>
        </div>
        <div className="modal-wrapper" style={helpModal ? {display: 'block'} : {display: 'none'}}>
          <div className={darkMode ? "help-modal dark" : "help-modal light"}>
            <div className="modal-close" onClick={() => sethelpModal(false)}>
              &#x2715;
            </div>
            <div className="modal-content">
              <Help />
            </div>
          </div>
        </div>
      </FluentProvider>
    </>
  )
}

export default App
