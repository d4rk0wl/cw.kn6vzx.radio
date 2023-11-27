import { NavLink } from 'react-router-dom'
import {
  Document24Filled,
  ChatEmpty24Filled,
  PersonTag24Filled,
  Book24Filled,
  ArrowClockwise24Filled,
  ContentSettings24Filled
} from '@fluentui/react-icons'
import '../styles/sidenav.scss'

type Props = {
  closeMobile: () => void
}

export default function Sidenav({closeMobile}: Props){
  return(
    <>
      <NavLink className="sidenav-icon" to="/words" onClick={() => closeMobile()}><span className='sidenav-link'><Document24Filled />&nbsp;&nbsp;Practice Words</span></NavLink>
      <NavLink className="sidenav-icon" to="/phrases" onClick={() => closeMobile()}><span className='sidenav-link'><ChatEmpty24Filled />&nbsp;&nbsp;Practice Phrases</span></NavLink>
      <NavLink className="sidenav-icon" to="/callsigns" onClick={() => closeMobile()}><span className='sidenav-link'><PersonTag24Filled />&nbsp;&nbsp;Practice Callsigns</span></NavLink>
      <NavLink className="sidenav-icon" to="/koch" onClick={() => closeMobile()}><span className='sidenav-link'><Book24Filled />&nbsp;&nbsp;Koch Method</span></NavLink>
      <NavLink className="sidenav-icon" to="/translator" onClick={() => closeMobile()}><span className='sidenav-link'><ArrowClockwise24Filled />&nbsp;&nbsp;Translator</span></NavLink>
      <NavLink className="sidenav-icon" to="/settings" onClick={() => closeMobile()}><span className='sidenav-link'><ContentSettings24Filled />&nbsp;&nbsp;Settings</span></NavLink>
    </>
  )
}

/*
    <SidenavIcon active={activePage == 'words' ? true : false} icon={<Document24Filled />} title={"Practice Words"} setActive={() => changePage('words')} />
    <SidenavIcon active={activePage == 'phrases' ? true : false} icon={<ChatEmpty24Filled />} title={"Practice Phrases"} setActive={() => changePage('phrases')} />
    <SidenavIcon active={activePage == 'callsigns' ? true : false} icon={<PersonTag24Filled />} title={"Practice Callsigns"} setActive={() => changePage('callsigns')} />
    <SidenavIcon active={activePage == 'koch' ? true : false} icon={<Book24Filled />} title={"Koch Method"} setActive={() => changePage('koch')} />
    <SidenavIcon active={activePage == 'translator' ? true : false} icon={<ArrowClockwise24Filled />} title={"Translator"} setActive={() => changePage('translator')} />
    <SidenavIcon active={activePage == 'settings' ? true : false} icon={<ContentSettings24Filled />} title={"Settings"} setActive={() => changePage('settings')} />
*/