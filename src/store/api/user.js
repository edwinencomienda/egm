import axios from 'axios'
import cookies from 'vue-cookies'
export default {
  me () {
    return axios.post(process.env.API_ENDPOINT + '/user/data?token=' + cookies.get('user_token_session'))
  }
}
