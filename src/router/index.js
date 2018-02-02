import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login'
import Dashboard from '@/components/dashboard/index'
import DashboardTemplate from '@/components/common/template'
import RegionIndex from '@/components/region/index'
import CreateRegion from '@/components/region/create'
import UpdateRegion from '@/components/region/update'
import ClusterIndex from '@/components/cluster/index'
import { store } from '@/store/index'

const authenticationNotRequired = (to, from, next) => {
  if (!store.getters['AUTH_IS_LOGIN']) {
    next()
    return
  }
  next('/')
}

const authenticationRequired = (to, from, next) => {
  if (!store.state.auth.user) {
    store.dispatch('SET_AUTH')
  }
  if (store.getters['AUTH_IS_LOGIN']) {
    if (store.getters['AUTH_IS_LOGIN']) {
      console.log('test')
      store.dispatch('USER_ACTION')
    }
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
          component: RegionIndex,
          meta: { title: 'Regions' }
        },
        {
          path: 'region/create',
          component: CreateRegion
        },
        {
          path: 'region/edit',
          component: UpdateRegion
        },
        {
          path: 'clusters',
          name: 'clusters',
          component: ClusterIndex,
          meta: { title: 'Clusters' }
        }
      ]
    },
    { path: '*', redirect: '/' }
  ]
})
