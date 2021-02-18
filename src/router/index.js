import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Mainarea from '../components/findmusic/Mainarea'

Vue.use(VueRouter)

// 哈希路由
const routes = [
  {
    path: '/',
    component: Index,
    redirect: '/mainarea',
    children: [
      {
        path: '/mainarea', component: Mainarea
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // 设置登录拦截
  if (to.path === '/mainarea') {
    return next()
  }
  // 获取cookies
  const tokenStr = window.sessionStorage.getItem('token')
  console.log(tokenStr)
  if (!tokenStr) {
    return next('/mainarea')
  }
  next()
})

export default router
