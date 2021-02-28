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
    },
    // 歌单详情
    musiclist: {
      title: '',
      songListId: '',
      tags: '',
      coverImgUrl: ''
    },
    // 单曲详情
    singleSong: {
      songId: '',
      songName: '',
      songtime: '',
      alImg: '',
      songCreator: '',
      alname: ''
    },
    // 播放器内置信息
    playerInfo: {
      title: '',
      artist: '',
      src: '',
      pic: '',
      songId: '',
      lrc: ''
    },
    // 控制Index.vue中的登录弹窗
    emailVisible: false,
    // Index.vue登录成功的信息
    pleaseLoginInfo: false
  },
  mutations: {
    // 保存账户信息
    saveProfile(state, userProfile) {
      state.profile.nickName = userProfile.nickname
      state.profile.avatarUrl = userProfile.avatarUrl
      state.profile.userId = userProfile.userId
      state.profile.backgroundUrl = userProfile.backgroundUrl
      state.profile.level = userProfile.userType
      state.profile.listenSongs = userProfile.playListCount
    },
    // 将token保存至localStorge
    setToken(state, token) {
      state.token = token
      window.localStorage.setItem('token', state.token)
    },
    // 将个人信息保存至localStorge
    setProfile(state) {
      window.localStorage.setItem('profile', JSON.stringify(state.profile))
    },
    // 将歌单信息保存至sessionStorge
    musicListClick(state, musicListData) {
      state.musiclist.songListId = musicListData.id
      state.musiclist.title = musicListData.name
      state.musiclist.tags = musicListData.tags
      state.musiclist.coverImgUrl = musicListData.coverImgUrl
      window.sessionStorage.setItem('musiclist', JSON.stringify(state.musiclist))
    },
    // 将单曲信息保存至sessionStorage
    singleSongClick(state, singleSongData) {
      state.singleSong.songId = singleSongData.id
      state.singleSong.songName = singleSongData.name
      state.singleSong.songtime = singleSongData.dt
      state.singleSong.alImg = singleSongData.al.picUrl
      state.singleSong.songCreator = singleSongData.ar[0].name
      state.singleSong.alname = singleSongData.al.name
      window.sessionStorage.setItem('singleSong', JSON.stringify(state.singleSong))
    },
    // 将播放器曲目信息保存至sessionStorage
    playerListData(state, [playerListInfo, musicUrl, lyric]) {
      state.playerInfo.title = playerListInfo.songName
      state.playerInfo.artist = playerListInfo.songCreator
      state.playerInfo.src = musicUrl
      state.playerInfo.pic = playerListInfo.alImg
      state.playerInfo.songId = playerListInfo.songId
      state.playerInfo.lrc = lyric
    },
    // 控制登录框弹出
    changeEmailVisible(state) {
      state.emailVisible = !state.emailVisible
    },
    // 兄弟组件之间通过标志变量控制登录框
    changePleaseLoginInfo(state, boolData) {
      state.pleaseLoginInfo = boolData
    }
  },
  actions: {
  },
  modules: {
  }
})
