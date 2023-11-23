import {
  Toaster,
  Toast,
  ToastTitle,
  ToastBody,
  useToastController,
  useId
} from '@fluentui/react-components'

type ToastType = {
  type: "success" | "error" | "warning",
  title: string,
  message: string
}

export default function Toasts( props: ToastType) {
  const toasterId = useId('toaster')
  const { dispatchToast } = useToastController(toasterId)

  const notify = () => {
    dispatchToast(
      <Toast>
        <ToastTitle>{props.title}</ToastTitle>
        <ToastBody>{props.message}</ToastBody>
      </Toast>,
      { position: 'top-end', intent: props.type}
    )
  }

  return(
    <>
      <Toaster toasterId={toasterId} />
    </>
  )
}