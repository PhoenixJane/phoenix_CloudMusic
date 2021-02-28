<template>
  <div>
    <!-- 歌单详情界面 -->
    <div id="songListNav">
      <div class="imgUrl">
        <img :src="musicListData.coverImgUrl" alt="" />
      </div>
      <div id="textContent">
        <h2>{{ musicListData.title }}</h2>
        <div class="tag">
          <span>标签：</span>
          <el-tag type="info" :key="i" v-for="(item, i) in musicListData.tags">{{ item }}</el-tag>
        </div>
      </div>
    </div>
    <!-- 歌单表格视图 -->
    <div id="songTable">
      <h2>全部歌曲</h2>
      <el-table :data="songListData" stripe style="width: 100%" @row-click="singleSong">
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
      // 歌单数据
      musicListData: {},
      // 单曲数据
      songListData: []
    }
  },
  created() {
    // 拉取歌单数据
    this.getMusicListData()
  },
  mounted() {
    // 拉取单曲数据
    this.getSongListData()
  },
  methods: {
    getMusicListData() {
      // 拉取sessionStorage中的歌单数据
      this.musicListData = JSON.parse(window.sessionStorage.getItem('musiclist'))
      console.log(this.musicListData)
    },
    async getSongListData() {
      // 获取单曲数据，并保存到sessionStorage中，防止刷新界面vuex丢失数据
      const { data: res } = await this.axios.get('/playlist/detail', {
        params: {
          id: this.musicListData.songListId
        }
      })
      if (res.code !== 200) {
        return this.$message.error('获取歌单详情失败！')
      }
      this.songListData = res.playlist.tracks
      console.log(this.songListData)
    },
    // 获取音乐的Url并通过vuex保存
    singleSong(row) {
      this.$store.commit('singleSongClick', row)
      this.$router.push('/songplay')
    }
  }
}
</script>
<style lang="less">
#songListNav {
  height: 210px;
  padding: 40px 0;
  display: flex;
  justify-content: start;
  .imgUrl {
    height: 100%;
    margin-right: 60px;
    img {
      height: 100%;
    }
  }
}

#textContent {
  .tag {
    margin-bottom: 50px;
    span {
      font-size: 12px;
      color: #666666;
    }
    .el-tag {
      height: 20px;
      padding: 0 5px;
      line-height: 18px;
      margin-right: 10px;
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
