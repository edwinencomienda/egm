import api from '../../api/common/package'
import { types } from '../../types'

export const state = {
  packages: []
}

export const getters = {
  'packages': state => state.packages
}

export const mutations = {
  [types.common.package.PACKAGE_SET] (state, payload) {
    state.packages = payload
  },
  [types.common.package.PACKAGE_ADD] (state, payload) {
    state.packages.push(payload)
  },
  [types.common.PACKAGE_UPDATE] (state, payload) {
    let index = state.packages.findIndex(item => item.slug === payload.slug)
    Object.assign(state.packages[index], payload)
  },
  [types.common.package.PACKAGE_REMOVE] (state, payload) {
    let index = state.packages.findIndex(item => item.slug === payload.slug)
    state.packages.splice(index, 1)
  }
}

export const actions = {
  [types.common.package.UPLOAD_FILE] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.uploadFile(data).then(response => {
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  [types.common.package.PACKAGE_CREATE] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.create(data).then(response => {
        commit(types.common.package.PACKAGE_ADD, response.data)
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  [types.common.package.PACKAGE_UPDATE] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      data.slug = data.region_slug
      data.description = data.description ? data.description : ''
      api.update(data).then(response => {
        commit(types.common.package.PACKAGE_UPDATE, response.data)
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  },
  [types.common.package.PACKAGE_DELETE] ({ commit }, data) {
    return new Promise((resolve, reject) => {
      api.delete({ region_slug: data.slug }).then(response => {
        commit(types.common.package.PACKAGE_REMOVE, { slug: data.slug })
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  }
}
