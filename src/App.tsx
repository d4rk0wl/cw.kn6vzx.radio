import { useState, useEffect } from 'react'
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
  Document24Filled,
  ChatEmpty24Filled,
  PersonTag24Filled,
  Book24Filled,
  ArrowClockwise24Filled,
  ContentSettings24Filled,
  GridDots28Regular 
} from '@fluentui/react-icons';

import './styles/app.scss'
import LogoTest from './components/Logo';
import Help from './components/Help';

import SidenavIcon from './components/Sidenavicon';
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
  const [ activePage, setactivePage ] = useState<string>('')
  const [ mobileNav, setmobileNav ] = useState<boolean>(false)
  const [ helpModal, sethelpModal ] = useState<boolean>(false)
  const styles = useStyles();

  useEffect(() => {
    setDefault()
  }, [])

  const renderPage = (page:string) => {
    switch(page) {
      case 'words':
        return(<Words />)
      case 'phrases':
        return(<Phrases />)
      case 'callsigns':
        return(<Callsigns />)
      case 'koch':
        return(<Koch />)
      case 'translator':
        return(<Translator />)
      case 'settings':
        return(<Settings darkMode={darkMode} setdarkMode={() => setdarkMode(!darkMode)} />)
      default:
        return(<Default />)
    }
  }

  const changePage = (page:string):void => {
    setmobileNav(false)
    setactivePage(page)
  }

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
                <h1 style={{ cursor: 'pointer'}} onClick={() => changePage('')}><i>KN6VZX</i> CW Practice</h1>
                <span style={{ cursor: 'pointer '}} onClick={() => changePage('')} className='logo'>
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
                <SidenavIcon active={activePage == 'words' ? true : false} icon={<Document24Filled />} title={"Practice Words"} setActive={() => changePage('words')} />
                <SidenavIcon active={activePage == 'phrases' ? true : false} icon={<ChatEmpty24Filled />} title={"Practice Phrases"} setActive={() => changePage('phrases')} />
                <SidenavIcon active={activePage == 'callsigns' ? true : false} icon={<PersonTag24Filled />} title={"Practice Callsigns"} setActive={() => changePage('callsigns')} />
                <SidenavIcon active={activePage == 'koch' ? true : false} icon={<Book24Filled />} title={"Koch Method"} setActive={() => changePage('koch')} />
                <SidenavIcon active={activePage == 'translator' ? true : false} icon={<ArrowClockwise24Filled />} title={"Translator"} setActive={() => changePage('translator')} />
                <SidenavIcon active={activePage == 'settings' ? true : false} icon={<ContentSettings24Filled />} title={"Settings"} setActive={() => changePage('settings')} />
              </div>
            </div>
          </div>
          <div className="main">
            {renderPage(activePage)}
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
