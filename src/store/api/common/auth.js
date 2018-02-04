import axios from 'axios'
import { env } from '../../config/env'

export default {
  login (credentials) {
    return axios.post(env.LOGIN_URL, credentials)
  }
}
