
import Vue from 'vue'
import Vuex from 'vuex'

import * as auth from './modules/common/auth.js'
import * as common from './modules/common/common.js'
import * as user from './modules/common/user'
import * as region from './modules/admin/region'
import * as cluster from './modules/common/cluster'
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
    region,
    cluster
  }
})
