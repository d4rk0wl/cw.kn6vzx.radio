import { useState, useEffect } from 'react'
import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
  useThemeClassName
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

import SidenavIcon from './components/Sidenavicon';
import Default from './pages/Default';
import Words from './pages/Words';
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

function App() {
  const [ darkMode, setdarkMode ] = useState<boolean>(false)
  const [ activePage, setactivePage ] = useState<string>('')
  const [ mobileNav, setmobileNav ] = useState<boolean>(true)

  useEffect(() => {
    console.log('initial render')
    setDefault()
  }, [])

  const renderPage = (page:string) => {
    switch(page) {
      case 'words':
        return(<Words />)
      case 'phrases':
        return(<h1>Phrases</h1>)
      case 'callsigns':
        return(<h1>Callsigns</h1>)
      case 'koch':
        return(<h1>Koch</h1>)
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
        <div className="app">
          <div className="topnav">
            <div className="topnav-content">
              <div className="topnav-title">
                <div className="menu">
                  <GridDots28Regular onClick={() => setmobileNav(true)} />
                </div>
                <h1><i>KN6VZX</i> CW Practice</h1>
                <LogoTest darkMode={darkMode} />
              </div>
              <div className="topnav-links">
                <QuestionCircle24Regular />
                <Rss24Regular />
              </div>
            </div>
          </div>
          <div className={mobileNav ? "sidenav open" : "sidenav close"}>
            <div className="sidenav-content">
              <div className="sidenav-close" onClick={() => setmobileNav(false)}>&#x2715;</div>
              <SidenavIcon active={activePage == 'words' ? true : false} icon={<Document24Filled />} title={"Practice Words"} setActive={() => changePage('words')} />
              <SidenavIcon active={activePage == 'phrases' ? true : false} icon={<ChatEmpty24Filled />} title={"Practice Phrases"} setActive={() => changePage('phrases')} />
              <SidenavIcon active={activePage == 'callsigns' ? true : false} icon={<PersonTag24Filled />} title={"Practice Callsigns"} setActive={() => changePage('callsigns')} />
              <SidenavIcon active={activePage == 'koch' ? true : false} icon={<Book24Filled />} title={"Koch Method"} setActive={() => changePage('koch')} />
              <SidenavIcon active={activePage == 'translator' ? true : false} icon={<ArrowClockwise24Filled />} title={"Translator"} setActive={() => changePage('translator')} />
              <SidenavIcon active={activePage == 'settings' ? true : false} icon={<ContentSettings24Filled />} title={"Settings"} setActive={() => changePage('settings')} />
            </div>
          </div>
          <div className="main">
            {renderPage(activePage)}
          </div>
        </div>
      </FluentProvider>
    </>
  )
}

export default App
