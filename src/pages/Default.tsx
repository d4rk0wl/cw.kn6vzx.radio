import {
  Display,
  Body2,
  Title1,
  Link
} from '@fluentui/react-components'

import {
  Warning48Regular
} from '@fluentui/react-icons'

import '../styles/landing.scss'

export default function Default():JSX.Element{
  return(
    <>
      <div className='wrapper'>
        <Display>Welcome</Display>
        <br />
        <Body2>
          To begin, select a practice mode from the left-hand navigation. Additionally you can configure various settings such as Words Per Minute (wpm), Farnsworth spacing, and tone via the settings menu.
        </Body2>
        <br />
        <br />
        <br />
        <br />
        <div className='warning'>
          <span className='warning-icons'>
            <Warning48Regular />&nbsp;<Title1>Warning</Title1>&nbsp;<Warning48Regular />
          </span>
          <span>
            <Body2>This app is still under development, and some core functionality may not be working properly. If anything is spotted, please let me know about it by sending an <Link href='mailto:administrator@kn6vzx.radio'>Email</Link>. Thanks!</Body2>
          </span>
        </div>
      </div>
    </>
  )
}