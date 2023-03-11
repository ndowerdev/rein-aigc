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

// const paginate = (items: any, page = 1, perPage = 10) => {
//   const offset = perPage * (page - 1)
//   const totalPages = Math.ceil(items.length / perPage)
//   const paginatedItems = items.slice(offset, perPage * page)

//   return {
//     previousPage: page - 1 ? page - 1 : null,
//     nextPage: (totalPages > page) ? page + 1 : null,
//     total: items.length,
//     totalPages,
//     items: paginatedItems,
//   }
// }
export { cencorString, showtAlert, showToast }
