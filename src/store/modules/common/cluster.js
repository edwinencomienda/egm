import { types } from '../../types'

export const state = {
  clusters: []
}

export const getters = {
  clusters: state => state.clusters
}

export const mutations = {
  [types.common.SET_CLUSTER] (state, payload) {
    state.clusters = payload
  }
}

export const actions = {
}
