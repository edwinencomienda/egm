export const state = {
  loading: false,
  disable: false
}

export const getters = {
  LOADING (state) {
    return !!state.loading
  },
  DISABLE (state) {
    return !!state.disable
  }
}

export const mutations = {
  SET_LOADING (state, data) {
    state.loading = data
  },
  SET_UNLOAD (state, data) {
    state.loading = data
  },
  SET_DISABLE (state, data) {
    state.disable = data
  },
  SET_ENABLE (state, data) {
    state.disable = data
  }
}

export const actions = {
  LOADING ({ commit }) {
    commit('SET_LOADING', true)
  },
  UNLOADING ({ commit }) {
    commit('SET_UNLOAD', false)
  },
  DISABLE ({ commit }) {
    commit('SET_DISABLE', true)
  },
  ENABLE ({ commit }) {
    commit('SET_ENABLE', false)
  }
}
