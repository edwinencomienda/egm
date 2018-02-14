import { types } from '../../types'

export const state = {
  clusters: []
}

export const getters = {
  clusters (state) {
    const items = []
    state.clusters.forEach((element) => {
      items.push({ ...element.clusters })
    })
    return items
  }
}

export const mutations = {
  [types.common.SET_CLUSTER] (state, payload) {
    state.clusters = payload
  }
}

export const actions = {
}
