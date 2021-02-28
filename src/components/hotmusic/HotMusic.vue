<template>
  <div>
    <!-- 热门音乐榜单 -->
    <h2><img src="../../assets/hotmusicicon.png" /> 大众喜爱的音乐</h2>
    <div id="songList">
      <div class="songs" :key="i" v-for="(item, i) in songList" @click="toSingleSong(item)">
        <el-image :src="item.al.picUrl"></el-image>
        <p>{{ item.name }}</p>
        <p class="artist"><span>by</span>{{ item.ar[0].name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      songList: [],
      songArea: []
    }
  },
  created() {
    // 获取歌曲列表
    this.getSongList()
  },
  methods: {
    async getSongList() {
      // axios获取歌单数据
      const { data: res } = await this.axios.get('/playlist/detail', {
        params: {
          id: 21845217
        }
      })
      if (res.code !== 200) {
        return this.$message.error('获取歌单失败！')
      }
      this.songList = res.playlist.tracks
      console.log(this.songList)
    },
    toSingleSong(songListData) {
      // 通过vuex将数据转移到singleSong组件
      this.$store.commit('singleSongClick', songListData)
      this.$router.push('/songplay')
    }
  }
}
</script>
<style lang="less" scoped>
h2 {
  font-weight: 400;
  padding-bottom: 10px;
  border-bottom: 2px solid #b91312;
  img {
    width: 25px;
    height: 25px;
    vertical-align: middle;
  }
}

#songList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 50px;
  .songs {
    cursor: pointer;
    margin-top: 15px;
    .el-image {
      width: 201px;
      height: 201px;
    }
    p {
      width: 201px;
      text-align: center;
      margin: 5px 0 0 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .artist {
      font-size: 14px;
      color: #666666;
      span {
        margin-right: 5px;
        color: #999999;
      }
    }
  }
}
</style>
