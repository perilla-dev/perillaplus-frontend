import toast from 'izitoast'
import 'izitoast/dist/css/iziToast.css'

export function toastError(msg: string) {
  toast.error({
    title: 'Error',
    message: msg
  })
}
