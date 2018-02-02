import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  create (data) {
    return axios.post(process.env.API_ENDPOINT + '/admin/region?token=' + cookies.get('user_token_session'), data)
  },
  update (data) {
    return axios.post(process.env.API_ENDPOINT + '/admin/region/' + data.slug + '?token=' + cookies.get('user_token_session'), data)
  },
  delete (data) {
    return axios.post(process.env.API_ENDPOINT + 'admin/region/' + data.slug + '?token=' + cookies.get('user_token_session'))
  }
}
