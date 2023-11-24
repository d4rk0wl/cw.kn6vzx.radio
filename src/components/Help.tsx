import {
  makeStyles,
  shorthands,
  Subtitle1,
  LargeTitle,
  Body1,
  Body2,
  Link
} from '@fluentui/react-components'

import historyGif from '../assets/history.webp'
import cheatsGif from '../assets/cheats.webp'

const useStyles = makeStyles({
  modalHead: {
    textAlign: 'center',
    paddingBottom: '10px',
    ...shorthands.borderBottom('1px', 'solid')
  },
  modalBody: {
    display: 'flex',
    alignItems: 'start',
    flexDirection: 'column',
    ...shorthands.padding('20px'),
  },
  bodyTitle: {
    paddingBottom: '5px',
    paddingTop: '5px'
  },
  image: {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    ...shorthands.margin('20px', 'auto', '20px', 'auto')
  }
})

export default function Help():JSX.Element {
  const styles = useStyles();
  return(
    <>
      <div className={styles.modalHead}>
        <LargeTitle>Application Help</LargeTitle>
      </div>
      <div className={styles.modalBody}>
        <Subtitle1 className={styles.bodyTitle}>Introduction:</Subtitle1>
        <Body1>Welcome to the KN6VZX CW training app. A casual game to either polish or strengthen your CW skills. Due to the magnitude of ways to learn and practice copying CW, this application has been split into multiple different elements.</Body1>
        <ul>
          <li><Body2 underline>Words:</Body2>&nbsp;&nbsp;<Body1>Request random dictionary word to be played back in CW. Multiple languages supported</Body1></li>
          <li><Body2 underline>Phrases:</Body2>&nbsp;&nbsp;<Body1>Practice commonly used CW phrases and short sentences.</Body1></li>
          <li><Body2 underline>Callsigns:</Body2>&nbsp;&nbsp;<Body1>Dynamically generate example callsigns to be played back in CW.</Body1></li>
          <li><Body2 underline>Koch:</Body2>&nbsp;&nbsp;<Body1>Slowly train your ear to copy all CW letters using the <Link target="_blank" href="http://naqcc.info/cw_koch.html">Ludwig Koch</Link> training method.</Body1></li>
          <li><Body2 underline>Translator:</Body2>&nbsp;&nbsp;<Body1>A simple translator which can be used for converting your given phrase to morse code.</Body1></li>
        </ul>
        <Subtitle1 className={styles.bodyTitle}>Getting Started:</Subtitle1>
        <Body1>To get started, simply select a training mode from the left-hand navigation bar. Prior to proceeding with a practice session, it may be wise to confirm all your settings beforehand. Inside the settings you have multiple options to configure the speed (WPM) of characters, tone settings and Farnsworth delay. Additional settings include application layout and various modes of assistance. Be advised, f you visit the settings later, your practice history for the given mode will be erased.</Body1>
        <Subtitle1 className={styles.bodyTitle}>Features:</Subtitle1>
        <Body1>The aim was to give a complete feature set while allowing users to focus more on learning without needing to work to navigate the application.</Body1>
        <ul>
          <li><Body2 underline>Interactive History and Morse Chart:</Body2></li>
        </ul>
        <Body1>When working through the various practice modes, successfully guessed words or phrases are shown below the main input prompt. If you would like to listen to a previously played item, simply click it and the morse oscillator will play it again. This feature is also available on the main morse chart, if hints are enabled inside the settings.</Body1>
        <img className={styles.image} src={historyGif} />
        <ul>
          <li><Body2 underline>Autoplay:</Body2></li>
        </ul>
        <Body1>One of the large problems I had while learning morse code was "preparing" for the first character to come through. It typically caught me off guard, making me miss the rest of the transmission as my reaction time failed to copy the first letter. This is an element I am sure goes away with time, however for the process of learning, it is nice to anticipate when a CW transmission is going to come. The autoplay feature automatically cycles a new word/phrase/callsign upon successful guess. The main submission form is linked to your Enter key, meaning when this feature is enabled you will never need to lift your hands from the keyboard while playing.</Body1>
        <ul>
          <li><Body2 underline>Cheat Mode:</Body2></li>
        </ul>
        <Body1>With Cheat Mode enabled, all solutions will be provided inside the respective browser's development tools. If you are unsure how to access your the development tools area inside your browser, please reference <Link target="_blank" href="https://balsamiq.com/support/faqs/browserconsole/">This Link</Link>. You can also use the assigned keyboard shortcut to quickly open and take a peek if you're stuck.</Body1>
        <img className={styles.image} src={cheatsGif} />
        <Subtitle1 className={styles.bodyTitle}>Coming Soon</Subtitle1>
        <Body1>In the efforts of timing, I wanted to get this published sooner than later. However, during development, there were many feature which I hope to incorporate as I revisit this project in the future. Such improvements would be incorporating a router function, so state is preserved across page refreshes. User account functionality so you can save and track your learning progress along with high scores. Additionally, finishing a reliable dictionary API which does not require a unique API key. Since this is a front-end only application, placing an API key in it's code is considered bad practice.</Body1>
        <Subtitle1 className={styles.bodyTitle}>Contact:</Subtitle1>
        <Body1>Throughout the corse of development, I added in many last-minute changes which were not in the original scope of the project. I am open to hearing all comments and criticisms. If something needs to be improved upon, please let me know by sending an email! - <Link href="mailto:administrator@kn6vzx.radio">administrator@kn6vzx.radio</Link></Body1>
      </div>
    </>
  )
}