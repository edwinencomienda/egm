// import user from '../api/user'
import user from '../../api/common/user'
import cookies from 'vue-cookies'
import { env } from '../../config/env'

export const state = {
  me: '',
  error: '',
  userData: ''
}

export const getters = {
  userData: state => state.userData,
  apiPrefix: state => state.userData ? state.userData.api_path_prefix : '',
  DOMAIN_URL () {
    let prefix = state.userData ? state.userData.api_path_prefix : ''
    return env.BASE_URL + '/' + prefix
  }
}

export const mutations = {
  SET_AUTH (state) {
    state.me = JSON.parse(cookies.get('user_session'))
  },
  SET_USER_DATA (state, payload) {
    state.userData = payload
  }
}

export const actions = {
  USER_ACTION ({ commit }, data) {
    return user.me().then(response => {
      commit('SET_USER_DATA', response.data)
      commit('SET_REGION', response.data.regions)
      commit('SET_CLUSTER', response.data.cluster_plans)
    }).catch(error => {
      commit('AUTH_ERROR', error.response.status)
    })
  }
}
