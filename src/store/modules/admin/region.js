import api from '../../api/admin/region'
import { types } from '../../types'

export const state = {
  regions: [],
  region: ''
}

export const getters = {
  'admin/regions': state => state.regions,
  'admin/regionClusters': state => state.region ? state.region.clusters : []
}

export const mutations = {
  [types.admin.ADMIN_REGION_SET] (state, payload) {
    state.regions = payload
  },
  [types.admin.ADMIN_REGION_ADD] (state, payload) {
    state.regions.push(payload)
  },
  [types.admin.ADMIN_REGION_SET_ITEM] (state, payload) {
    state.region = payload
  },
  [types.admin.ADMIN_REGION_UPDATE] (state, payload) {
    let index = state.regions.findIndex(item => item.slug === payload.slug)
    Object.assign(state.regions[index], payload)
  },
  [types.admin.ADMIN_REGION_REMOVE] (state, payload) {
    let index = state.regions.findIndex(item => item.slug === payload.slug)
    state.regions.splice(index, 1)
  }
}

export const actions = {
  [types.admin.ADMIN_REGION_SET] ({ commit }, payload) {
    commit(types.admin.ADMIN_REGION_SET, payload)
  },
  [types.admin.ADMIN_REGION_CREATE] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.create(data).then(response => {
        commit(types.admin.ADMIN_REGION_ADD, response.data)
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  [types.admin.ADMIN_REGION_UPDATE] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.update(data).then(response => {
        commit(types.admin.ADMIN_REGION_UPDATE, response.data)
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  [types.admin.ADMIN_REGION_DELETE] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.delete({ region_slug: data.slug }).then(response => {
        commit(types.admin.ADMIN_REGION_REMOVE, { slug: data.slug })
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  }
}
