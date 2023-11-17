import {
  Display,
  Body2
} from '@fluentui/react-components'


export default function Default():JSX.Element{
  return(
    <>
      <div className="landing-page">
        <Display>Welcome</Display>
        <Body2>
          To begin, select a practice mode from the left-hand navigation. Additionally you can configure various settings such as Words Per Minute (wpm), Farnsworth spacing, and tone via the settings menu. Currently in development is a login mechanism to save and track your progress.
        </Body2>
        <Body2>
          The inspiration for this project came from the fact there is not a whole lot of CW practice/training websites which are not app based.
        </Body2>
      </div>
    </>
  )
}