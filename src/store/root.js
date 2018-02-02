import { SET_FORM_STATE, SET_EDIT_ITEM } from './types'

export const state = {
  editItem: '',
  formState: ''
}

export const getters = {
  editItem: state => state.editItem,
  formState: state => state.formState
}

export const mutations = {
  [SET_FORM_STATE] (state, payload) {
    state.formState = payload
  },
  [SET_EDIT_ITEM] (state, payload) {
    state.editItem = payload
  }
}
