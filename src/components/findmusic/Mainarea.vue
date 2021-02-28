<template>
  <div>
    <!-- 幻灯片部分 -->
    <el-carousel :interval="4000" type="card" :height="bannerHeight + 'px'" indicator-position="outside" trigger="click">
      <el-carousel-item v-for="item in slide" :key="item.id">
        <img ref="bannerHeightRef" :src="item.slideImg" @load="imgLoad" @click="saveSingleSong(item.songId)" />
      </el-carousel-item>
    </el-carousel>
    <!-- 主要内容 -->
    <div class="main-content">
      <!-- 热门推荐部分 -->
      <div class="recommendation">
        <!-- 面包屑导航 -->
        <div class="recommendation-nav">
          <img src="../../assets/record.png" alt="加载错误" />
          <a href="javascript:;">热门歌单</a>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>华语</el-breadcrumb-item>
            <el-breadcrumb-item>流行</el-breadcrumb-item>
            <el-breadcrumb-item>民谣</el-breadcrumb-item>
            <el-breadcrumb-item>电子</el-breadcrumb-item>
          </el-breadcrumb>
          <a href="javascript:;">更多<i class="el-icon-sort"></i></a>
        </div>
        <!-- 歌单区域 -->
        <div class="recommendation-song">
          <div :key="item.id" v-for="item in imgSong" @click="songList(item.cat)">
            <el-image :src="item.src"></el-image>
            <p>{{ item.p }}</p>
          </div>
        </div>
      </div>
      <!-- 新歌速递部分 -->
      <div class="newRecord">
        <!-- 导航 -->
        <div class="newRecord-nav">
          <img src="../../assets/record.png" alt="加载失败" />
          <a href="javascript:;">新歌速递</a>
          <a href="javascript:;">更多<i class="el-icon-sort"></i></a>
        </div>
        <!-- 新歌内容区 -->
        <div class="newRecord-Content">
          <div :key="item.id" v-for="item in newRecordImg" @click="saveSingleSong(item.songId)">
            <el-image :src="item.src"></el-image>
            <span>{{ item.title }}</span>
            <p>{{ item.artist }}</p>
          </div>
        </div>
      </div>
      <!-- 榜单部分 -->
      <div class="musicList">
        <!-- 导航 -->
        <div class="newRecord-nav">
          <img src="../../assets/record.png" alt="加载失败" />
          <a href="javascript:;">榜单</a>
          <a href="javascript:;">更多<i class="el-icon-sort"></i></a>
        </div>
        <!-- 榜单部分 -->
        <div id="songTable">
          <h2>新歌榜</h2>
          <el-table :data="songListData" stripe style="width: 100%" @row-click="toSingleSong" border>
            <el-table-column label="排名" width="100" type="index"> </el-table-column>
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 幻灯片图片数据
      slide: [
        { id: 0, slideImg: require('../../assets/slide/slide1.jpg'), songId: 1817458262 },
        { id: 1, slideImg: require('../../assets/slide/slide2.jpg'), songId: 1817458505 },
        { id: 2, slideImg: require('../../assets/slide/slide3.jpg'), songId: 1817459349 },
        { id: 3, slideImg: require('../../assets/slide/slide4.jpg'), songId: 1416321513 },
        { id: 4, slideImg: require('../../assets/slide/slide5.jpg'), songId: 1817716780 },
        { id: 5, slideImg: require('../../assets/slide/slide6.jpg'), songId: 1817451429 }
      ],
      // 热门推荐图片数据
      imgSong: [
        { id: 0, p: '华语原创 经典之声', src: require('../../assets/musicPopularNav/musicPopularContent1.jpg'), cat: '华语' },
        { id: 1, p: '好听到单曲循环', src: require('../../assets/musicPopularNav/musicPopularContent2.jpg'), cat: 'ACG' },
        { id: 2, p: '暗恋向 | 我想去你那边看月光', src: require('../../assets/musicPopularNav/musicPopularContent3.jpg'), cat: '日语' },
        { id: 3, p: '致郁系 | 不被允许的不快乐', src: require('../../assets/musicPopularNav/musicPopularContent4.jpg'), cat: '另类/独立' },
        { id: 4, p: '说唱 | 那些非战斗人员请撤离', src: require('../../assets/musicPopularNav/musicPopularContent5.jpg'), cat: '说唱' },
        { id: 5, p: '暮色将近，世界温柔闪烁', src: require('../../assets/musicPopularNav/musicPopularContent6.jpg'), cat: '夜晚' },
        { id: 6, p: '专治不开心的致郁歌曲', src: require('../../assets/musicPopularNav/musicPopularContent7.jpg'), cat: '快乐' },
        { id: 7, p: '爱情，从来不是一件简单的事', src: require('../../assets/musicPopularNav/musicPopularContent8.jpg'), cat: '浪漫' },
        { id: 8, p: '2020年度发行盘点：编辑推荐', src: require('../../assets/musicPopularNav/musicPopularContent9.jpg'), cat: '90后' },
        { id: 9, p: '没事听听轻音乐', src: require('../../assets/musicPopularNav/musicPopularContent10.jpg'), cat: '轻音乐' }
      ],
      // 图片高度
      bannerHeight: '',
      // 新歌速递图片数据
      newRecordImg: [
        { id: 0, src: require('../../assets/newRecord/newRecord1.jpg'), title: 'Love Love Love', artist: '蔡依林', songId: 209750 },
        { id: 1, src: require('../../assets/newRecord/newRecord2.jpg'), title: 'aLIEz', artist: 'mizuki', songId: 29307041 },
        { id: 2, src: require('../../assets/newRecord/newRecord3.jpg'), title: 'Controla', artist: 'Gueira Lindo', songId: 1818951660 },
        { id: 3, src: require('../../assets/newRecord/newRecord4.jpg'), title: '可信之歌', artist: '可信新能源', songId: 1815985521 },
        { id: 4, src: require('../../assets/newRecord/newRecord5.jpg'), title: 'ASK', artist: 'Doka', songId: 526892517 },
        { id: 5, src: require('../../assets/newRecord/newRecord6.jpg'), title: '牛年就是牛', artist: '贾铭铭/方小仙/蒋婧然/李耀鑫', songId: 1818046940 }
      ],
      songListData: []
    }
  },
  created() {
    this.getSongList()
  },
  mounted() {
    // 调整幻灯片窗口适应
    this.imgLoad()
    window.addEventListener(
      'resize',
      () => {
        this.bannerHeight = this.$refs.bannerHeightRef[0].height
        this.imgLoad()
      },
      false
    )
  },
  methods: {
    // 根据浏览器可视窗口动态改变幻灯大小
    imgLoad() {
      this.$nextTick(() => {
        this.bannerHeight = this.$refs.bannerHeightRef[0].height
      })
    },
    // 获取页面中的歌单数据
    async songList(catName) {
      const { data: res } = await this.axios.get('/top/playlist/highquality', {
        params: {
          cat: catName
        }
      })
      if (res.code !== 200) {
        return this.$message.error('获取歌单信息失败')
      }
      console.log(res)
      this.$store.commit('musicListClick', res.playlists[0])
      this.$router.push('musiclist')
    },
    // 获取页面中的单曲数据
    async saveSingleSong(songId) {
      const { data: res } = await this.axios.get('/song/detail', {
        params: {
          ids: songId
        }
      })
      if (res.code !== 200) {
        return this.$message.error('拉取单曲数据失败！')
      }
      this.$store.commit('singleSongClick', res.songs[0])
      this.$router.push('/songplay')
    },
    async getSongList() {
      // axios获取歌单数据
      const { data: res } = await this.axios.get('/playlist/detail', {
        params: {
          id: 3779629
        }
      })
      if (res.code !== 200) {
        return this.$message.error('获取歌单失败！')
      }
      // 限制榜单显示数目
      this.songListData = res.playlist.tracks.slice(0, 10)
      console.log(this.songListData)
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
.el-carousel {
  margin-top: 35px;
}
.el-carousel__item {
  left: -8%;
  width: 80%;
}

.is-active {
  width: 100%;
}

.el-breadcrumb {
  /deep/ .el-breadcrumb__separator {
    font-weight: 400;
    font-size: 5px;
  }
}
.recommendation-nav {
  display: flex;
  align-items: flex-end;
  border-bottom: 2px solid #b81412;
  margin-top: 10px;
  padding-bottom: 5px;
  img {
    width: 20px;
    height: 20px;
    padding: 0 10px 0px 10px;
  }
  a:nth-child(2) {
    color: #000;
    font-weight: 700;
    margin-right: 30px;
    font-size: 20px;
  }
  a:nth-child(4) {
    flex: 1;
    text-align: right;
    color: #cdc4cf;
    font-weight: 400;
    font-size: 10px;
    margin-right: 5px;
    i {
      margin-left: 3px;
      font-size: 10px;
      color: #d24544;
      font-weight: 700;
    }
  }
}

.recommendation-song {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  div {
    cursor: pointer;
    margin-top: 15px;
    .el-image {
      width: 201px;
      height: 201px;
      box-shadow: 0 0 3px #606266;
    }
    p {
      width: 201px;
      text-align: center;
      margin: 5px 0 0 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  div:nth-child(n + 6) {
    margin: 15px 0 50px 0;
  }
}

.newRecord-nav {
  display: flex;
  align-items: flex-end;
  border-bottom: 2px solid #b81412;
  padding-bottom: 5px;
  img {
    width: 20px;
    height: 20px;
    padding: 0 10px 0px 10px;
  }
  a:nth-child(2) {
    color: #000;
    font-weight: 700;
    margin-right: 30px;
    font-size: 20px;
  }
  a:nth-child(3) {
    flex: 1;
    text-align: right;
    color: #cdc4cf;
    font-weight: 400;
    font-size: 10px;
    margin-right: 5px;
    i {
      margin-left: 3px;
      font-size: 10px;
      color: #d24544;
      font-weight: 700;
    }
  }
}

.newRecord-Content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  div {
    position: relative;
    cursor: pointer;
    margin-top: 15px;
    width: 385px;
    height: 120px;
    background: #f7f8f9 url('../../assets/newRecord/newRecordbg.png') 10% no-repeat;
    background-size: 110px 110px;
    .el-image {
      margin: 0;
      width: 120px;
    }
    span {
      position: absolute;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transform: translate(20%, 180%);
    }
    p {
      position: absolute;
      display: inline;
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #909399;
      transform: translate(20%, 210%);
    }
  }
  div:nth-child(n + 4) {
    margin: 15px 0 50px 0;
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
