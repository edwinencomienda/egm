import axios from 'axios'
// import cookies from 'vue-cookies'
import { env } from '../../config/env'

export default {
  me () {
    return axios.post(env.USER_URL)
  }
}
