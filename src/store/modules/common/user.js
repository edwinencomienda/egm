// import user from '../api/user'
import user from '../../api/common/user'
import cookies from 'vue-cookies'
import { types } from '../../types'

export const state = {
  me: '',
  userData: '',
  userDataError: false
}

export const getters = {
  userData: state => state.userData,
  userDataError: state => state.userDataError
}

export const mutations = {
  SET_AUTH (state) {
    state.me = JSON.parse(cookies.get('user_session'))
  },
  SET_USER_DATA (state, payload) {
    state.userData = payload
  },
  SET_USER_ERROR (state, payload) {
    state.userDataError = payload
  }
}

export const actions = {
  USER_ACTION ({ commit }, data) {
    return new Promise((resolve, reject) => {
      user.me().then(response => {
        commit('SET_USER_DATA', response.data)
        commit(types.admin.ADMIN_REGION_SET, response.data.regions)
        commit(types.admin.ADMIN_PACKAGE_SET, response.data.global_packages)
        commit(types.common.SET_CLUSTER, response.data.cluster_plans)
        resolve(response)
      }, error => {
        reject(error)
      })
    })
  }
}
