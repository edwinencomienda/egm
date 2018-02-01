import user from '../api/user'
import cookies from 'vue-cookies'

export const state = {
  me: '',
  error: ''
}

export const getters = {

}

export const mutations = {
  SET_AUTH (state) {
    state.me = JSON.parse(cookies.get('user_session'))
  }
}

export const actions = {
  USER_ACTION ({ commit }, data) {
    return user.me().then(response => {
      console.log(response.data)
    //   if (response.status === 200) {
    //     cookies.set('user_token_session', response.data.access_token, 3600)
    //     cookies.set('user_session', JSON.stringify(response.data), 3600)
    //     commit('SET_AUTH')
    //   }
    }).catch(error => {
      commit('AUTH_ERROR', error.response.status)
    })
  }
}
