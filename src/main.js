// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
import VueRouter from 'vue-router'
import 'vuetify/dist/vuetify.min.css'
require('sweetalert2/dist/sweetalert2.min.css')
import cookies from 'vue-cookies'
import axios from 'axios'
import { axiosConfig } from '../config/axios.config'
import { store } from './store/index.js'
const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'en',
  dictionary: null,
  strict: true
}
console.log(axiosConfig)
Vue.config.productionTip = false
Vue.prototype.$axios = axios.create(axiosConfig)
Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(cookies)
Vue.use(VeeValidate, config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
