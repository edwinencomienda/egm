import axios from 'axios'
import cookies from 'vue-cookies'
import { env } from '../../config/env'

export default {
  create (data) {
    return axios.post(env.DOMAIN_URL + 'admin/region?token=' + cookies.get('user_token_session'), data)
  },
  update (data) {
    return axios.post(env.DOMAIN_URL + 'admin/region/' + data.region_slug + '?token=' + cookies.get('user_token_session'), data)
  },
  delete (data) {
    return axios.post(env.DOMAIN_URL + 'admin/region/' + data.region_slug + '?token=' + cookies.get('user_token_session'))
  }
}
