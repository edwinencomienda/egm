import user from '../../api/common/user'
import cookies from 'vue-cookies'
import { types } from '../../types'

export const state = {
  me: '',
  userData: '',
  userDataError: false,
  appPathPrefix: ''
}

export const getters = {
  userData: state => state.userData,
  userDataError: state => state.userDataError,
  userRole: state => state.userData && state.userData.me.role ? state.userData.me.role : '',
  appPathPrefix: state => state.appPathPrefix ? state.appPathPrefix : ''
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
  },
  SET_APP_PATH_PREFIX (state, payload) {
    state.appPathPrefix = payload
  }
}

export const actions = {
  USER_ACTION ({ commit }, data) {
    commit(types.common.SET_TABLE_LOADING, true)
    return new Promise((resolve, reject) => {
      user.me().then(response => {
        commit('SET_USER_DATA', response.data)
        commit(types.admin.ADMIN_REGION_SET, response.data.regions)
        commit(types.common.package.PACKAGE_SET, response.data.global_packages)
        commit(types.common.SET_CLUSTER, response.data.regions)
        commit(types.common.SET_TABLE_LOADING, false)
        resolve(response)
      }, error => {
        commit(types.common.SET_TABLE_LOADING, false)
        reject(error)
      })
    })
  }
}
