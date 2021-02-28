<template>
  <div>
    <!-- 主视图 -->
    <div id="mainArea">
      <!-- 专辑图片+介绍 -->
      <div id="albumArea">
        <img :src="singleSongData.alImg" alt="" />
        <p>
          专辑：<span>{{ singleSongData.alname }}</span>
        </p>
      </div>
      <!-- 歌词部分 -->
      <div id="songDetail">
        <h2>{{ singleSongData.songName }}</h2>
        <p>{{ singleSongData.songCreator }}</p>
        <el-button type="primary" icon="el-icon-video-play" @click="play" round>立即播放</el-button>
        <!-- 将歌词处理为单行，'\n'转换为换行 -->
        <div class="lyric" ref="lyricToggleRef">
          <span v-if="aplayerMusic.lrc !== ''">
            <p :key="i" v-for="(item, i) in newLyric" v-html="spacewarp(item)"></p>
          </span>
          <span v-else>
            <p v-html="'本歌曲暂无歌词'"></p>
          </span>
        </div>
        <a href="javascript:;" @click="lyricBtn" ref="lyricBtnRef">{{ lyricBtnText }} <i class="el-icon-arrow-down" ref="lyricIconRef"></i></a>
      </div>
    </div>
    <!-- 播放器 -->
    <div id="songPlayer">
      <aplayer :music="aplayerMusic" :showLrc="true" repeat="music" :list="aplayerMusicList" :listFolded="true" ref="aplayerRef" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 单曲数据
      singleSongData: {},
      // 歌词
      lyric: '',
      // 处理后的歌词
      newLyric: [],
      // 显示/隐藏歌词部分
      lyricBtnText: '展开',
      // aplayer插件所需的music对象
      aplayerMusic: {},
      // aplayer插件所需的歌单数据
      aplayerMusicList: []
    }
  },
  created() {
    // 获取单曲信息
    this.getSingleSongData()
  },
  mounted() {
    // 获取单曲对应的歌词
    this.getlyric()
    // 获取aplayer插件中music对象所需的数据
    this.getPlayList()
  },
  methods: {
    // 从sessionStorge拉取单曲数据与播放器歌单数据
    getSingleSongData() {
      this.singleSongData = JSON.parse(window.sessionStorage.getItem('singleSong'))
    },
    // 获取单曲对应歌词
    async getlyric() {
      const { data: res } = await this.axios.get('/lyric', {
        params: {
          id: this.singleSongData.songId
        }
      })
      if (res.code !== 200) {
        return this.$message.error('获取歌词失败')
      }
      this.lyric = res.lrc.lyric
      // 处理歌词
      const lines = this.lyric.split(/\n/)
      const lyricReg = /\[.*\]/
      lines.forEach(item => {
        const LyricTrim = item.replace(lyricReg, '').trim()
        this.newLyric.push(LyricTrim)
      })
      console.log(this.newLyric)
    },
    // 拉取播放器需要的music对象
    async getPlayList() {
      const { data: res } = await this.axios.get('/song/url', {
        params: {
          id: this.singleSongData.songId
        }
      })

      if (res.code !== 200) {
        return this.$message.error('拉取音乐数据失败')
      }
      this.$store.commit('playerListData', [this.singleSongData, res.data[0].url, this.lyric])
      this.aplayerMusic = this.$store.state.playerInfo
      console.log(this.aplayerMusic)

      // 将aplayerMusic添加到播放器歌单信息
      const playListConfirm = JSON.parse(window.sessionStorage.getItem('playerList'))
      if (playListConfirm !== null) {
        this.aplayerMusicList = JSON.parse(window.sessionStorage.getItem('playerList'))
      }
      // 播放器歌单去重，防止添加重复单曲
      const playerListReapt = this.aplayerMusicList.some(item => {
        return this.aplayerMusic.songId === item.songId
      })
      console.log(playerListReapt)
      if (!playerListReapt) {
        this.aplayerMusicList.push(this.aplayerMusic)
        // 将播放器歌单保存到sessionStorage中
        window.sessionStorage.setItem('playerList', JSON.stringify(this.aplayerMusicList))
      }
      if (this.newLyric.length < 15 || this.aplayerMusic.lrc === '') {
        // 如果歌词小于15行，不需要折叠
        this.$refs.lyricToggleRef.className = 'lyricShow'
        this.lyricBtnText = ''
        this.$refs.lyricIconRef.className = ''
      }
    },
    play() {
      this.$refs.aplayerRef.play()
    },
    lyricBtn() {
      if (this.lyricBtnText === '展开') {
        this.lyricBtnText = '收起'
        this.$refs.lyricIconRef.className = 'el-icon-arrow-up'
        this.$refs.lyricToggleRef.className = 'lyricShow'
      } else {
        this.lyricBtnText = '展开'
        this.$refs.lyricIconRef.className = 'el-icon-arrow-down'
        this.$refs.lyricToggleRef.className = 'lyric'
      }
    }
    // getaplayerMusicList() {
    //   this.aplayerMusicList = JSON.parse(window.sessionStorage.getItem('playerList'))
    // }
  },
  computed: {
    // 利用闭包传值的方式，处理歌词中的'\n'
    spacewarp() {
      return value => (value === '' ? '<br>' : value)
    }
  }
}
</script>
<style lang="less" scoped>
#mainArea {
  display: flex;
  justify-content: start;
  margin: 50px 5px;
  #albumArea {
    img {
      width: 300px;
      height: 300px;
      box-shadow: 0 0 3px #606266;
    }
    p {
      width: 300px;
      margin-top: 30px;
      color: #909399;
      span {
        color: #000;
      }
    }
  }

  #songDetail {
    margin-left: 80px;

    .el-button {
      font-size: 16px;
      padding: 10px 15px;
      margin: 20px 0 50px;
    }

    p {
      font-size: 14px;
      color: #606266;
    }

    .lyric {
      height: 500px;
      overflow: hidden;
    }

    .lyricShow {
      height: auto;
    }

    a {
      font-size: 13px;
      color: #599dff;
    }

    a:hover {
      color: #357ee4;
    }
  }
}

#songPlayer {
  .aplayer {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}
</style>
