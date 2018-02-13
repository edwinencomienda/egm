import swal from 'sweetalert2'

export default {
  generalDefaultSuccess (title = false, text = false) {
    swal({
      type: 'success',
      title: !title ? 'Successful' : title,
      text: !text ? '' : text
    })
  },
  generalDefaultError (title = false, text = false) {
    swal({
      type: 'error',
      title: !title ? 'Oops...' : title,
      text: !text ? 'Something wrong happened.' : text
    })
  }
}
