import {
  Display,
  Body2,
  Title2,
  Link,
  Image
} from '@fluentui/react-components'

import instagram from '../assets/instagram.png';
import pota from '../assets/pota-logo.png';
import sota from '../assets/sota_logo.jpg';
import qrz from '../assets/qrz.png';

import '../styles/landing.scss'

export default function Default():JSX.Element{
  return(
    <>
      <div className='wrapper'>
        <Display>Welcome</Display>
        <br />
        <div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center'}}>
          <Title2 style={{ 'paddingBottom': '20px' }}>
            To begin, select a practice mode from the left-hand navigation. Additionally you can configure various settings such as Words Per Minute (wpm), Farnsworth spacing, and tone via the settings menu.
          </Title2>
          <Body2 style={{ 'paddingBottom': '10px' }}>
            For now, this application works best on Chrome. Although usable inside Firefox and Safari, you may experience excessive clicking from the oscillator component. Improvements are being made to increase compatibility with other browsers.
          </Body2>
          <Body2 style={{ 'paddingBottom': '10px' }}>
            Please submit any questions or bug reports to me! I am always looking to improve this application and any feedback is greatly appreciated <Link href='mailto:administrator@kn6vzx.radio'>administrator@kn6vzx.radio</Link>
          </Body2>
          <Body2 style={{ 'paddingBottom': '10px' }}>
            For more information about me, please see my <Link href='https://kn6vzx.radio' target='_blank'><b>Blog</b></Link> or check out the socials:
          </Body2>
          <div style={{ 'display':'flex', 'alignItems': 'center', 'flexWrap': 'wrap', 'gap': '10px' }}>
            <Link href='https://pota.app/#/profile/KN6VZX' target="_blank"><Image height='100px' width='auth' src={pota} /></Link>
            <Link href='https://sotl.as/activators/KN6VZX' target="_blank"><Image height='70px' width='auto' src={sota} /></Link>
            <Link href='https://www.instagram.com/d4rk0wl_/' target="_blank"><Image height='90px' width='auto' src={instagram} /></Link>
            <Link href='https://www.qrz.com/db/kn6vzx' target='_blank'><Image height='80px' width='auto' src={qrz} /></Link>
          </div>
        </div>
      </div>
    </>
  )
}