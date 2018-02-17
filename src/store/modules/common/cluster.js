import { types } from '../../types'

export const state = {
  clusters: [],
  cluster: ''
}

export const getters = {
  clusters: state => state.clusters,
  clusterApps: state => state.cluster ? state.cluster.apps : []
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
  },
  [types.partner.PARTNER_CLUSTER_SET_ITEM] (state, payload) {
    state.cluster = payload
  }
}

export const actions = {
}
