import Vue from 'vue'
import VueRouter from 'vue-router'
// import Index from '../components/Index.vue'
// import Mainarea from '../components/findmusic/Mainarea.vue'

const Index = () => import(/* webpackChunkName: "Index_Mainarea" */ '../components/Index.vue')
const Mainarea = () => import(/* webpackChunkName: "Index_Mainarea" */ '../components/findmusic/Mainarea.vue')

// import Musiclist from '../components/musiclist/Musiclist.vue'
// import SongPlay from '../components/songplay/SongPlay.vue'

const Musiclist = () => import(/* webpackChunkName: "Musiclist_Songplay" */ '../components/musiclist/Musiclist.vue')
const SongPlay = () => import(/* webpackChunkName: "Musiclist_Songplay" */ '../components/songplay/SongPlay.vue')

// import MyMusic from '../components/mymusic/MyMusic.vue'
// import PleaseLogin from '../components/mymusic/PleaseLogin.vue'

const MyMusic = () => import(/* webpackChunkName: "MyMusic_PleaseLogin" */ '../components/mymusic/MyMusic.vue')
const PleaseLogin = () => import(/* webpackChunkName: "MyMusic_PleaseLogin" */ '../components/mymusic/PleaseLogin.vue')

// import HotMusic from '../components/hotmusic/HotMusic.vue'
// import Download from '../components/download/Download.vue'

const HotMusic = () => import(/* webpackChunkName: "HotMusic_Download" */ '../components/hotmusic/HotMusic.vue')
const Download = () => import(/* webpackChunkName: "HotMusic_Download" */ '../components/download/Download.vue')

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
      },
      {
        path: '/musiclist', component: Musiclist
      },
      {
        path: '/songplay', component: SongPlay
      },
      {
        path: '/mymusic', component: MyMusic
      },
      {
        path: '/pleaselogin', component: PleaseLogin
      },
      {
        path: '/hotmusic', component: HotMusic
      },
      {
        path: '/download', component: Download
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // 获取cookies
  const tokenStr = window.localStorage.getItem('token')
  if (to.path === '/mymusic' && !tokenStr) {
    return next('/pleaselogin')
  }
  next()
})

export default router
