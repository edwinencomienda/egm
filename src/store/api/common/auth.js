import axios from 'axios'
import { env } from '../../config/env'

export default {
  login (credentials) {
    return axios.post(env.API_USER_LOGIN, credentials)
  }
}
