import {type Theme, toast, type ToastPosition} from 'react-toastify'

interface ToastOptions {
  position: ToastPosition
  autoClose: number
  hideProgressBar: boolean
  closeOnClick: boolean
  pauseOnHover: boolean
  draggable: boolean
  progress?: number
  theme: Theme
}

const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
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
