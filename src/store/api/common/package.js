import { axios } from '../../config/axios'
import { env } from '../../config/env'

export default {
  uploadFile (data) {
    return axios.post(env.buildApiEndpoint('package/fetch'), data)
  },
  create (data) {
    return axios.post(env.buildApiEndpoint('region/create'), data)
  },
  update (data) {
    return axios.post(env.buildApiEndpoint('region/update/' + data.region_slug), data)
  },
  delete (data) {
    return axios.post(env.buildApiEndpoint('region'), { region_slug: data.region_slug, _method: 'delete' })
  }
}
