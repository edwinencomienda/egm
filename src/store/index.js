
import Vue from 'vue'
import Vuex from 'vuex'

import * as auth from './modules/auth.js'
import * as common from './modules/common.js'
import * as user from './modules/user.js'
import * as region from './modules/region.js'

import { state, getters, mutations } from './root'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  modules: {
    auth,
    common,
    user,
    region
  }
})
