import { toast } from 'react-toastify'

export const errorCatcher = (error) => {
  console.log('error', error)
  const msg = error.response.data.message
  toast.error(msg)
}
