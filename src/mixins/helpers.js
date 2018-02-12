import swal from 'sweetalert2'

export default {
  generalDefaultError (title = false, text = false) {
    swal({
      type: 'error',
      title: !title ? 'Oops...' : title,
      text: !text ? 'Something wrong happened.' : text
    })
  }
}
