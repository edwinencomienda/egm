import { SET_CLUSTER } from '../../types'

export const state = {
  clusters: []
}

export const getters = {
  clusters: state => state.clusters
}

export const mutations = {
  [SET_CLUSTER] (state, payload) {
    state.clusters = payload
  }
}

export const actions = {
}
