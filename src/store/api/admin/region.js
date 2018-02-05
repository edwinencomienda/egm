import axios from 'axios'
import cookies from 'vue-cookies'
import { store } from '../../index'

export default {
  create (data) {
    return axios.post(store.getters.DOMAIN_URL + 'region?token=' + cookies.get('user_token_session'), data)
  },
  update (data) {
    return axios.post(store.getters.DOMAIN_URL + 'region/' + data.region_slug + '?token=' + cookies.get('user_token_session'), data)
  },
  delete (data) {
    console.log(data.region_slug)
    return axios.delete(store.getters.DOMAIN_URL + 'region/' + data.region_slug + '?token=' + cookies.get('user_token_session'), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new FormData(data.region_slug)
    })
  }
}
