import user from '../../api/common/user'
import cookies from 'vue-cookies'
import { types } from '../../types'

export const state = {
  me: '',
  userData: '',
  userDataError: false,
  appPathPrefix: '',
  userRole: cookies.get('user_role')
}

export const getters = {
  userData: state => state.userData,
  userDataError: state => state.userDataError,
  userRole: state => state.userRole,
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
  USER_ACTION ({ commit, getters }, data) {
    commit(types.common.SET_TABLE_LOADING, true)
    return new Promise((resolve, reject) => {
      user.me().then(response => {
        commit('SET_USER_DATA', response.data)
        if (getters.userRole === 'admin') {
          // admin initial commits
          commit(types.admin.ADMIN_REGION_SET, response.data.regions)
        } else {
          // partner intial commits
          commit(types.partner.PARTNER_APP_SET, response.data.clusters)
        }
        // common intial commits
        commit(types.common.package.PACKAGE_SET, getters.userRole === 'admin' ? response.data.global_packages : response.data.partner_packages)
        commit(types.common.SET_CLUSTER, getters.userRole === 'admin' ? { admin: true, data: response.data.regions } : { partner: true, data: response.data.clusters })
        commit(types.common.SET_TABLE_LOADING, false)
        resolve(response)
      }, error => {
        commit(types.common.SET_TABLE_LOADING, false)
        reject(error)
      })
    })
  }
}
