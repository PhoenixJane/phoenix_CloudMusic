import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import 'normalize.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://localhost:3000'

axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers.Authorization = window.localStorage.getItem('token')
  console.log(config)
  if (config.method === 'post') {
    config.data = {
      ...config.data,
      _t: Date.parse(new Date()) / 1000
    }
  } else if (config.method === 'get') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
  }
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
