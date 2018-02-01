
import axios from 'axios'

export default {
  login (credentials) {
    return axios.post(process.env.API_ENDPOINT + '/auth/login', credentials)
  }
}
