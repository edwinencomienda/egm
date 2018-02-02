
import Vue from 'vue'
import Vuex from 'vuex'

import * as auth from './modules/auth.js'
import * as common from './modules/common.js'
import * as user from './modules/user.js'
import * as region from './modules/region.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth,
    common,
    user,
    region
  }
})
