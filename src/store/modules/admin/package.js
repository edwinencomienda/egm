import api from '../../api/admin/region'
import { types } from '../../types'

export const state = {
  packages: [],
  region: ''
}

export const getters = {
  'admin/packages': state => state.packages
}

export const mutations = {
  [types.admin.ADMIN_PACKAGE_SET] (state, payload) {
    state.packages = payload
  },
  [types.admin.ADMIN_PACKAGE_ADD] (state, payload) {
    state.packages.push(payload)
  },
  [types.admin.ADMIN_PACKAGE_SET_ITEM] (state, payload) {
    state.region = payload
  },
  [types.admin.ADMIN_PACKAGE_UPDATE] (state, payload) {
    let index = state.packages.findIndex(item => item.slug === payload.slug)
    Object.assign(state.packages[index], payload)
  },
  [types.admin.ADMIN_PACKAGE_REMOVE] (state, payload) {
    let index = state.packages.findIndex(item => item.slug === payload.slug)
    state.packages.splice(index, 1)
  }
}

export const actions = {
  [types.admin.ADMIN_PACKAGE_CREATE] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.create(data).then(response => {
        commit(types.admin.ADMIN_PACKAGE_ADD, response.data)
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  [types.admin.ADMIN_PACKAGE_UPDATE] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      data.slug = data.region_slug
      data.description = data.description ? data.description : ''
      api.update(data).then(response => {
        commit(types.admin.ADMIN_PACKAGE_UPDATE, response.data)
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  [types.admin.ADMIN_PACKAGE_DELETE] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      data.region_slug = data.slug
      api.delete(data).then(response => {
        commit(types.admin.ADMIN_PACKAGE_REMOVE, { slug: data.slug })
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  }
}
