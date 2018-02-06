import { store } from '../../index'
import { axios } from '../../config/axios'

export default {
  create (data) {
    return axios.post(store.getters.DOMAIN_URL + 'region', data)
  },
  update (data) {
    return axios.post(store.getters.DOMAIN_URL + 'region/' + data.region_slug, data)
  },
  delete (data) {
    return axios.post(store.getters.DOMAIN_URL + 'region/' + data.region_slug, { region_slug: data.region_slug, _method: 'delete' })
  }
}
