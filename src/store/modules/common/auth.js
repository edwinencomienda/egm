
import auth from '../../api/common/auth'
import cookies from 'vue-cookies'

export const state = {
  user: '',
  error: ''
}

export const getters = {
  AUTH_IS_LOGIN (state) {
    return !!state.user
  },
  AUTH_TOKEN (state) {
    return state.user ? state.user.access_token : ''
  }
}

export const mutations = {
  SET_AUTH (state) {
    state.user = JSON.parse(cookies.get('user_session'))
  },
  AUTH_ERROR (state, error) {
    state.error = error
  }
}

export const actions = {
  AUTH_LOGIN ({ commit }, data) {
    return auth.login(data).then(response => {
      if (response.status === 200) {
        cookies.set('user_token_session', response.data.access_token, response.data.expires_in)
        cookies.set('user_session', JSON.stringify(response.data), response.data.expires_in)
        cookies.set('api_path_prefix', response.data.api_path_prefix, response.data.expires_in)
        // set app path prefix
        cookies.set('app_path_prefix', (response.data.role === 'admin' ? '/admin' : '/partner'), response.data.expires_in)
        commit('SET_AUTH')
      }
    }).catch(error => {
      commit('AUTH_ERROR', error.response.status)
    })
  },
  AUTH_LOGOUT () {
    cookies.remove('user_session')
    cookies.remove('user_token_session')
    cookies.remove('api_path_prefix')
  },
  SET_AUTH ({ commit }) {
    commit('SET_AUTH')
    window.access_token = cookies.get('user_token_session')
  }
}
