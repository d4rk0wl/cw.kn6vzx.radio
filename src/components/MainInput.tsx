import {
  Input,
  Button,
  makeStyles
} from '@fluentui/react-components'

const useStyles = makeStyles({
  input: {
    fontSize: '2em;',
    paddingTop: '10px;',
    paddingBottom: '10px;',
    textAlign: 'center' //Why doesn't this work?
  },
  submit: {
    maxWidth: '100px;',
    marginLeft: 'calc(50% - 50px);'
  }
})

type Props = {
  submit: () => void,
  placeholder: string,
  value: string,
  change: (input: React.ChangeEvent<HTMLInputElement>) => void,
}

export default function MainInput({ submit, placeholder, value, change }: Props){
  const styles = useStyles();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      submit()
    }
  }

  return(
    <>
      <Input className={styles.input} placeholder={placeholder} value={value} onChange={(e) => change(e)} onKeyDown={(e) => handleKeyDown(e)} />
      <Button className={styles.submit} appearance='primary' onClick={() => submit()}>Submit</Button>
    </>
  )
}