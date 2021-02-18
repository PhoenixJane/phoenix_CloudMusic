import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存token
    token: '',
    // 用户的基本信息
    profile: {
      nickName: '登录',
      avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      userId: '',
      backgroundUrl: '',
      level: '',
      listenSongs: ''
    }
  },
  mutations: {
    saveProfile(state, userProfile) {
      state.profile.nickName = userProfile.nickname
      state.profile.avatarUrl = userProfile.avatarUrl
      state.profile.userId = userProfile.userId
      state.profile.backgroundUrl = userProfile.backgroundUrl
      state.profile.level = userProfile.userType
      state.profile.listenSongs = userProfile.playListCount
    },
    setToken(state, token) {
      state.token = token
      window.localStorage.setItem('token', state.token)
    },
    setProfile(state) {
      window.localStorage.setItem('profile', JSON.stringify(state.profile))
    }
  },
  actions: {
  },
  modules: {
  }
})
