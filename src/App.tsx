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
  Tooltip
} from '@fluentui/react-components'

import { Rss24Regular, 
  QuestionCircle24Regular,
  GridDots28Regular 
} from '@fluentui/react-icons';

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

function App() {
  const [ darkMode, setdarkMode ] = useState<boolean>(false)
  const [ mobileNav, setmobileNav ] = useState<boolean>(false)
  const [ helpModal, sethelpModal ] = useState<boolean>(false)
  const styles = useStyles();

  useEffect(() => {
    setDefault()
  }, [])

  return (
    <>
      <FluentProvider theme={darkMode ? webDarkTheme : webLightTheme}>
        <ApplyToBody />
        <div className="app modal">
          <div className="topnav">
            <div className="topnav-content">
              <div className="topnav-title">
                <div className="menu">
                  <GridDots28Regular onClick={() => setmobileNav(true)} />
                </div>
                <h1 style={{ cursor: 'pointer'}}><i>KN6VZX</i> CW Practice</h1>
                <span style={{ cursor: 'pointer '}} className='logo'>
                  <LogoTest darkMode={darkMode} />
                </span>
              </div>
              <div className="topnav-links">
                <Tooltip content={"Show help panel"} relationship='description'>
                  <QuestionCircle24Regular className={styles.topIcons} onClick={() => sethelpModal(true)} />
                </Tooltip>
                <Tooltip content={"Visit the blog"} relationship='description'>
                  <Link className={styles.iconLink} target="_blank" href="https://kn6vzx.radio"><Rss24Regular className={styles.topIcons} /></Link>
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
              <Route path="/words" element={<Words />} />
              <Route path="/phrases" element={<Phrases />} />
              <Route path="/callsigns" element={<Callsigns />} />
              <Route path="/koch" element={<Koch />} />
              <Route path="/translator" element={<Translator /> } />
              <Route path="/settings" element={<Settings darkMode={darkMode} setdarkMode={() => setdarkMode(!darkMode)}/>} />
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
