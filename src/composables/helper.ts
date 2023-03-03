import Swal from 'sweetalert2'
const cencorString = (string: any) => {
  if (string !== undefined)
    return string.toString().replace(/(\w| )(?=(\w| ){4})/g, '*')

  // return string.replace(new RegExp(`\\b${string}\\b`, 'g'), '***')
  // return string.toString().replace(/(\w| )(?=(\w| ){4})/g, '*')
}

const showtAlert = (string: string) => {
  Swal.fire(string)
}

const showToast = (_string: string) => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: _string,
    showConfirmButton: false,
    timer: 1500,
  })
}

export { cencorString, showtAlert, showToast }
