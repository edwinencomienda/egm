import api from '../../api/admin/region'
import { CREATE_REGION, ADD_REGION, SET_REGION, UPDATE_REGION, DELETE_REGION } from '../../types'

export const state = {
  me: '',
  error: '',
  userData: '',
  regions: []
}

export const getters = {
  regions: state => state.regions
}

export const mutations = {
  [SET_REGION] (state, payload) {
    state.regions = payload
  },
  [ADD_REGION] (state, payload) {
    state.regions.push(payload)
  }
}

export const actions = {
  [SET_REGION] ({ commit }, payload) {
    commit(SET_REGION, payload)
  },
  [CREATE_REGION] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.create(data).then(response => {
        commit(ADD_REGION, response.data)
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  [UPDATE_REGION] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      data.slug = data.region_slug
      data.description = data.description ? data.description : ''
      api.update(data).then(response => {
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  [DELETE_REGION] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      data.region_slug = data.slug
      api.delete(data).then(response => {
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  }
}
