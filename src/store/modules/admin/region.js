import api from '../../api/admin/region'
import { CREATE_REGION, ADD_REGION, SET_REGION, UPDATE_REGION, DELETE_REGION, SET_REGION_ITEM } from '../../types'

export const state = {
  me: '',
  error: '',
  userData: '',
  regions: [],
  region: ''
}

export const getters = {
  regions: state => state.regions,
  regionClusters: state => state.region ? state.region.clusters : []
}

export const mutations = {
  [SET_REGION] (state, payload) {
    state.regions = payload
  },
  [ADD_REGION] (state, payload) {
    state.regions.push(payload)
  },
  [SET_REGION_ITEM] (state, payload) {
    state.region = payload
  },
  [UPDATE_REGION] (state, payload) {
    let index = state.regions.findIndex(item => item.slug === payload.slug)
    Object.assign(state.regions[index], payload)
  },
  [DELETE_REGION] (state, payload) {
    let index = state.regions.findIndex(item => item.slug === payload.slug)
    state.regions.splice(index, 1)
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
        commit(UPDATE_REGION, response.data)
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
        commit(DELETE_REGION, { slug: data.slug })
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  }
}
