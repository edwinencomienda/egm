import cookies from 'vue-cookies'
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/auth/Login'
import Dashboard from '@/components/dashboard/Index'
import ViewTemplate from '@/components/common/layout/Template'

import AdminRegionIndex from '@/components/admin/region/Index'
import AdminRegionCreate from '@/components/admin/region/Create'
import AdminRegionUpdate from '@/components/admin/region/Update'
import AdminRegionCluster from '@/components/admin/region/cluster/Index'

import PartnerAppIndex from '@/components/partner/app/Index'

import ClusterIndex from '@/components/cluster/Index'

import PackageIndex from '@/components/common/package/Index'

import { store } from '@/store/index'

const authenticationNotRequired = (to, from, next) => {
  if (!cookies.get('user_token_session')) {
    next()
    return
  }
  next('/')
}

let appPathPrefix = cookies.get('app_path_prefix') ? cookies.get('app_path_prefix') : '/login'

const authenticationRequired = (to, from, next) => {
  if (!store.getters.AUTH_IS_LOGIN) {
    store.dispatch('SET_AUTH')
    // set app prefix by user role and set as app root path
    store.commit('SET_APP_PATH_PREFIX', cookies.get('app_path_prefix'))
  }
  if (cookies.get('user_token_session')) {
    if (!store.getters.userData) {
      store.dispatch('USER_ACTION').catch(() => {
        store.dispatch('AUTH_LOGOUT')
        store.commit('SET_USER_ERROR', true)
      })
    }
    next()
    return
  }
  next('/login')
}

Vue.use(Router)

// create route from app path prefix
function createRoute (path) {
  return appPathPrefix + path
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: createRoute('/dashboard'),
      beforeEnter: authenticationRequired
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      beforeEnter: authenticationNotRequired
    },
    {
      path: createRoute('/dashboard'),
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: authenticationRequired
    },
    {
      path: createRoute('/regions'),
      meta: { title: 'Regions' },
      component: ViewTemplate,
      beforeEnter: authenticationRequired,
      children: [
        {
          path: '/',
          name: 'regions',
          component: AdminRegionIndex
        },
        {
          path: 'create',
          component: AdminRegionCreate
        },
        {
          path: 'update',
          component: AdminRegionUpdate
        },
        {
          path: 'clusters',
          component: AdminRegionCluster
        }
      ]
    },
    {
      path: createRoute('/clusters'),
      meta: { title: 'Clusters' },
      component: ClusterIndex,
      beforeEnter: authenticationRequired
    },
    {
      path: createRoute('/packages'),
      meta: { title: 'Packages' },
      component: PackageIndex,
      beforeEnter: authenticationRequired
    },
    {
      path: createRoute('/apps'),
      meta: { title: 'Apps' },
      component: PartnerAppIndex,
      beforeEnter: authenticationRequired
    },
    { path: '*', redirect: '/' }
  ]
})
