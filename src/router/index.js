import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login'
import Dashboard from '@/components/dashboard/index'
import Template from '@/components/common/template'
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
      name: 'dashboard',
      component: Template,
      beforeEnter: authenticationRequired,
      children: [
        {
          path: '',
          component: Dashboard,
          meta: { title: 'Dashboard' }
        }
      ]
    },
    { path: '*', redirect: '/' }
  ]
})
