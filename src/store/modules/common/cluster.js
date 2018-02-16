import { types } from '../../types'

export const state = {
  clusters: []
}

export const getters = {
  clusters: state => state.clusters
}

export const mutations = {
  [types.common.SET_CLUSTER] (state, payload) {
    if (payload.admin) {
      let clusters = []
      const regions = payload.data
      // merge all clusters from all regions
      regions.forEach(element => {
        clusters = [...clusters, ...element.clusters]
      })
      state.clusters = clusters
    } else {
      state.clusters = payload.data
    }
  }
}

export const actions = {
}
