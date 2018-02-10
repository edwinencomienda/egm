
import Vue from 'vue'
import Vuex from 'vuex'

import * as auth from './modules/common/auth.js'
import * as common from './modules/common/common.js'
import * as user from './modules/common/user'
// admin modules
import * as adminRegion from './modules/admin/region'
// common modules
import * as packages from './modules/common/package'
import * as cluster from './modules/common/cluster'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth,
    common,
    user,
    adminRegion,
    packages,
    cluster
  }
})
