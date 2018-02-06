import cookies from 'vue-cookies'
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login'
import Dashboard from '@/components/dashboard/index'
import DashboardTemplate from '@/components/common/template'

import AdminRegionIndex from '@/components/admin/region/index'
import AdminCreateRegion from '@/components/admin/region/create'
import AdminUpdateRegion from '@/components/admin/region/update'
import ClusterIndex from '@/components/cluster/index'
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
    store.dispatch('USER_ACTION')
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
      component: Login,
      beforeEnter: authenticationNotRequired
    },
    {
      path: '/dashboard',
      component: DashboardTemplate,
      beforeEnter: authenticationRequired,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
          meta: { title: 'Dashboard' }
        },
        {
          path: 'regions',
          name: 'regions',
          component: AdminRegionIndex,
          meta: { title: 'Regions' }
        },
        {
          path: 'region/create',
          component: AdminCreateRegion
        },
        {
          path: 'region/edit',
          component: AdminUpdateRegion
        },
        {
          path: 'clusters',
          name: 'Clusters',
          component: ClusterIndex
        }
      ]
    },
    { path: '*', redirect: '/' }
  ]
})
