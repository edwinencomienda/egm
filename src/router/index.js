import cookies from 'vue-cookies'
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/auth/login'
import dashboard from '@/components/dashboard/index'
import dashboardTemplate from '@/components/common/layout/template'

import adminRegionIndex from '@/components/admin/region/index'
import adminRegionCreate from '@/components/admin/region/create'
import adminRegionUpdate from '@/components/admin/region/update'
import adminRegionClusterIndex from '@/components/admin/region/cluster/index'
import clusterIndex from '@/components/cluster/index'

import packageIndex from '@/components/common/package/index'

import { store } from '@/store/index'

const authenticationNotRequired = (to, from, next) => {
  if (!cookies.get('user_token_session')) {
    next()
    return
  }
  next('/')
}

const authenticationRequired = (to, from, next) => {
  if (!store.getters.AUTH_IS_LOGIN) {
    store.dispatch('SET_AUTH')
  }
  if (cookies.get('user_token_session')) {
    store.dispatch('USER_ACTION').catch(() => {
      store.dispatch('AUTH_LOGOUT')
      store.commit('SET_USER_ERROR', true)
    })
    next()
    return
  }
  next('/login')
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
      beforeEnter: authenticationRequired
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      beforeEnter: authenticationNotRequired
    },
    {
      path: '/dashboard',
      component: dashboardTemplate,
      beforeEnter: authenticationRequired,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: dashboard,
          meta: { title: 'Dashboard' }
        },
        {
          path: 'regions',
          name: 'regions',
          component: adminRegionIndex,
          meta: { title: 'Regions' }
        },
        {
          path: 'region/clusters',
          component: adminRegionClusterIndex
        },
        {
          path: 'region/create',
          component: adminRegionCreate
        },
        {
          path: 'region/edit',
          component: adminRegionUpdate
        },
        {
          path: 'clusters',
          name: 'Clusters',
          component: clusterIndex
        },
        {
          path: 'packages',
          name: 'packages',
          component: packageIndex,
          meta: { title: 'packages' }
        }
      ]
    },
    { path: '*', redirect: '/' }
  ]
})
