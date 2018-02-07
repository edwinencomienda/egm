import { env } from '../../config/env'
import { axios } from '../../config/axios'

export default {
  me () {
    return axios.post(env.API_USER_DATA)
  }
}
