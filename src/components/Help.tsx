import {
  makeStyles,
  shorthands,
  Subtitle1,
  LargeTitle,
  Body1,
  Body2,
  Link
} from '@fluentui/react-components'

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
          <li><Body2 underline>Koch:</Body2>&nbsp;&nbsp;<Body1>Slowly train your ear to copy all CW letters using the <Link href="http://naqcc.info/cw_koch.html">Ludwig Koch</Link> training method.</Body1></li>
        </ul>
        <Subtitle1 className={styles.bodyTitle}>Getting Started:</Subtitle1>
        <Body1>To get started, simply select a training mode from the left-hand navigation bar. Prior to proceeding with a practice session, it may be wise to confirm all your settings beforehand. Inside the settings you have multiple options to configure the speed (WPM) of characters, tone settings and Farnsworth delay. Additional settings include application layout and various modes of assistance. If you visit the settings later, your practice history for the given mode will be erased.</Body1>
        <Subtitle1>Features:</Subtitle1>
        <Body1>Something</Body1>
        <Subtitle1>Common Tasks:</Subtitle1>
        <Subtitle1>Contact:</Subtitle1>
        <Body1>Throughout the corse of development, I added in many last-minute changes which were not in the original scope of the project. I am open to hearing all comments and criticisms. If something needs to be improved upon, please let me know by sending an email! - <Link href="mailto:administrator@kn6vzx.radio">administrator@kn6vzx.radio</Link></Body1>
      </div>
    </>
  )
}