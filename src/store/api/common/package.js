import { axios } from '../../config/axios'
import { env } from '../../config/env'

export default {
  uploadFile (data) {
    return axios.post(env.buildApiEndpoint('package/fetch'), data)
  },
  create (data) {
    return axios.post(env.buildApiEndpoint('package/create'), data)
  },
  update (data) {
    return axios.post(env.buildApiEndpoint('package/update/' + data.package_slug), data)
  },
  delete (data) {
    return axios.post(env.buildApiEndpoint('package'), { package_slug: data.package_slug, _method: 'delete' })
  }
}
