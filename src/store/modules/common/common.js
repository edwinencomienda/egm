import { types } from '../../types'

export const state = {
  loading: false,
  disable: false,
  editItem: '',
  formState: '',
  swalDefaultErrorObject: {
    type: 'error',
    title: 'Oops...',
    text: 'Something went wrong!'
  }
}

export const getters = {
  LOADING (state) {
    return !!state.loading
  },
  DISABLE (state) {
    return !!state.disable
  },
  editItem: state => state.editItem,
  formState: state => state.formState,
  swalDefaultErrorObject: state => state.swalDefaultErrorObject
}

export const mutations = {
  [types.common.SET_LOADING] (state, data) {
    state.loading = data
  },
  [types.common.SET_UNLOAD] (state, data) {
    state.loading = data
  },
  [types.common.SET_DISABLE] (state, data) {
    state.disable = data
  },
  [types.common.SET_ENABLE] (state, data) {
    state.disable = data
  },
  [types.common.SET_FORM_STATE] (state, payload) {
    state.formState = payload
  },
  [types.common.SET_EDIT_ITEM] (state, payload) {
    state.editItem = Object.assign({}, payload)
  }
}

export const actions = {
  [types.common.LOADING] ({ commit }) {
    commit(types.common.SET_LOADING, true)
  },
  [types.common.UNLOADING] ({ commit }) {
    commit(types.common.SET_UNLOAD, false)
  },
  [types.common.DISABLE] ({ commit }) {
    commit(types.common.SET_DISABLE, true)
  },
  [types.common.ENABLE] ({ commit }) {
    commit(types.common.SET_ENABLE, false)
  }
}
