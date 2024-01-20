import {
  type Theme,
  toast,
  type ToastPosition,
  type ToastTransition,
  Slide,
} from 'react-toastify'

interface ToastOptions {
  position: ToastPosition
  autoClose: number
  hideProgressBar: boolean
  closeOnClick: boolean
  pauseOnHover: boolean
  draggable: boolean
  progress?: number
  theme: Theme
  transition: ToastTransition
}

const defaultToastOptions: ToastOptions = {
  autoClose: 1500,
  closeOnClick: true,
  draggable: true,
  position: 'bottom-left',
  hideProgressBar: true,
  pauseOnHover: false,
  theme: 'light',
  transition: Slide,
}
function ToasterMessage(type: string, message: string): void {
  switch (type) {
    case 'success':
      toast.success(message, defaultToastOptions)
      break
    case 'error':
      toast.error(message, defaultToastOptions)
      break
    case 'warning':
      toast.warn(message, defaultToastOptions)
      break
    case 'info':
      toast.info(message, defaultToastOptions)
      break
    default:
      break
  }
}
export {ToasterMessage}
