import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import 'normalize.css/normalize.css'
import 'hls.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Aplayer from 'vue-aplayer'

// 导入NProgress包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'http://localhost:3000'

axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
  // 在request拦截器中，展示进度条Nnprogress.start()
  NProgress.start()
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

axios.interceptors.response.use(config => {
  // 在response拦截器中，隐藏进度条Nnprogress.done()
  NProgress.done()
  return config
})

Vue.use(VueAxios, axios)

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  // 年月日
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  // 时分秒
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.filter('songTimeFormat', function (originVal) {
  // 时分秒
  const duration = originVal / 1000
  let s = Math.floor(duration % 60).toString()
  if (s.length < 2) {
    s = '0' + s
  }
  let m = Math.floor((duration % 3600) / 60).toString()
  if (m.length < 2) {
    m = '0' + m
  }
  // return `${m} : ${s}`
  return m + ' : ' + s
})

Vue.component('aplayer', Aplayer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
