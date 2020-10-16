import toast from 'izitoast'
import 'izitoast/dist/css/iziToast.css'

export function toastError(msg: string) {
  toast.error({
    title: 'Error',
    message: msg
  })
}

export function toastSuccess(msg: string) {
  toast.success({
    title: 'Success',
    message: msg
  })
}
