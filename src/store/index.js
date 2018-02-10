
import Vue from 'vue'
import Vuex from 'vuex'

import * as auth from './modules/common/auth.js'
import * as common from './modules/common/common.js'
import * as user from './modules/common/user'
import * as adminRegion from './modules/admin/region'
import * as adminPackage from './modules/admin/package'
import * as cluster from './modules/common/cluster'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth,
    common,
    user,
    adminRegion,
    adminPackage,
    cluster
  }
})
