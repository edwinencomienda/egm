import { axios } from '../../config/axios'
import { env } from '../../config/env'

export default {
  uploadFile (data) {
    return axios.post(env.buildApiEndpoint('package/fetch'), data)
  },
  create (data) {
    return axios.post(env.buildApiEndpoint('package/create'), data)
  }
}
