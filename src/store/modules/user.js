import user from '../api/user'
import cookies from 'vue-cookies'

export const state = {
  me: '',
  error: '',
  userData: ''
}

export const getters = {
  userData: state => state.userData,
  regions: state => state.userData ? state.userData.regions : [],
  clusterPlans: state => state.userData ? state.userData.cluster_plans : []
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
    }).catch(error => {
      commit('AUTH_ERROR', error.response.status)
    })
  }
}
