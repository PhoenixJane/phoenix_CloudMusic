<template>
  <div>
    <!-- 我的音节页面主区域 -->
    <div id="header">
      <!-- 专辑图片部分 -->
      <div class="albumpic">
        <img :src="favList.coverImgUrl" />
      </div>
      <!-- 专辑内容介绍 -->
      <div class="favorite">
        <h2>{{ favList.title }}</h2>
        <div class="user">
          <img :src="profile.avatarUrl" />
          <span>{{ profile.nickName }}</span>
        </div>
      </div>
    </div>
    <!-- 歌单区域 -->
    <div id="songTable">
      <h2>歌曲列表</h2>
      <el-table :data="songList" stripe style="width: 100%" @row-click="singleSong">
        <el-table-column label="#" width="100" type="index"> </el-table-column>
        <el-table-column prop="name" label="歌曲"> </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手" width="180"> </el-table-column>
        <el-table-column label="时长" width="180">
          <template slot-scope="scope">
            {{ scope.row.dt | songTimeFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="al.name" label="专辑"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 用户账户信息
      profile: '',
      // 用户最喜欢的歌单信息
      favList: {},
      // 歌单列表数据
      songList: []
    }
  },
  created() {
    // 获取用户数据
    this.getUserData()
    // 获取用户歌单列表信息
    this.getSongList()
  },
  methods: {
    async getUserData() {
      // 获取sessionStorge中的用户的账号信息
      this.profile = JSON.parse(window.localStorage.getItem('profile'))
      // 获取用户最喜爱的歌单
      const { data: res } = await this.axios.get('/user/playlist', {
        params: {
          uid: this.profile.userId
        }
      })
      if (res.code !== 200) {
        return this.$message.error('获取用户歌单失败！')
      }
      // 通过vuex处理用户详情信息
      this.$store.commit('musicListClick', res.playlist[0])
    },
    async getSongList() {
      // 从sessionStorage中获取音乐列表的Id值
      this.favList = JSON.parse(window.sessionStorage.getItem('musiclist'))
      const { data: res } = await this.axios.get('/playlist/detail', {
        params: {
          id: this.favList.songListId
        }
      })
      if (res.code !== 200) {
        return this.$message.error('获取歌单列表数据失败！')
      }
      this.songList = res.playlist.tracks
    },
    // 获取音乐的Url并通过vuex保存
    singleSong(row) {
      this.$store.commit('singleSongClick', row)
      this.$router.push('/songplay')
    }
  }
}
</script>
<style lang="less" scoped>
#header {
  display: flex;
  justify-content: start;
  margin: 50px 0;
  .albumpic {
    margin-right: 50px;
  }
  .favorite {
    .user {
      display: flex;
      align-items: center;
      img {
        width: 35px;
        height: 35px;
      }
      span {
        margin-left: 10px;
      }
    }
  }
}

#songTable {
  margin-bottom: 50px;
  h2 {
    font-weight: 400;
  }
  .el-table {
    tr {
      cursor: pointer;
    }
  }
}
</style>
