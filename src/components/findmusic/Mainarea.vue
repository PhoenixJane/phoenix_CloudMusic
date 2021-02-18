<template>
  <div>
    <!-- 幻灯片部分 -->
    <el-carousel :interval="4000" type="card" :height="bannerHeight + 'px'" indicator-position="outside" trigger="click">
      <el-carousel-item v-for="item in slide" :key="item.id">
        <img ref="bannerHeightRef" :src="item.slideImg" @load="imgLoad" />
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
          <div>
            <el-image :src="imgSong.src1"></el-image>
            <p>华语原创 经典之声</p>
          </div>
          <div>
            <el-image :src="imgSong.src2"></el-image>
            <p>好听到单曲循环</p>
          </div>
          <div>
            <el-image :src="imgSong.src3"></el-image>
            <p>暗恋向 | 我想去你那边看月光</p>
          </div>
          <div>
            <el-image :src="imgSong.src4"></el-image>
            <p>致郁系 | 不被允许的不快乐</p>
          </div>
          <div>
            <el-image :src="imgSong.src5"></el-image>
            <p>中文说唱 | 那些非战斗人员请撤离</p>
          </div>
          <div>
            <el-image :src="imgSong.src6"></el-image>
            <p>暮色将近，世界温柔闪烁</p>
          </div>
          <div>
            <el-image :src="imgSong.src7"></el-image>
            <p>专治不开心的致郁歌曲</p>
          </div>
          <div>
            <el-image :src="imgSong.src8"></el-image>
            <p>爱情，从来不是一件简单的事</p>
          </div>
          <div>
            <el-image :src="imgSong.src9"></el-image>
            <p>2020年度发行盘点：编辑推荐</p>
          </div>
          <div>
            <el-image :src="imgSong.src10"></el-image>
            <p>没事听听轻音乐</p>
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
          <div>
            <el-image :src="newRecordImg.src1"></el-image>
            <span>Love Love Love</span>
            <p>蔡依林</p>
          </div>
          <div>
            <el-image :src="newRecordImg.src2"></el-image>
            <span>aLIEz</span>
            <p>mizuki</p>
          </div>
          <div>
            <el-image :src="newRecordImg.src3"></el-image>
            <span>Controla</span>
            <p>Gueira Lindo</p>
          </div>
          <div>
            <el-image :src="newRecordImg.src4"></el-image>
            <span>可信之歌</span>
            <p>可信新能源</p>
          </div>
          <div>
            <el-image :src="newRecordImg.src5"></el-image>
            <span>ASK</span>
            <p>Doka</p>
          </div>
          <div>
            <el-image :src="newRecordImg.src6"></el-image>
            <span>牛年就是牛</span>
            <p>贾铭铭/方小仙/蒋婧然/李耀鑫</p>
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
        <el-table border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
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
        { id: 0, slideImg: require('../../assets/slide/slide1.jpg') },
        { id: 1, slideImg: require('../../assets/slide/slide2.jpg') },
        { id: 2, slideImg: require('../../assets/slide/slide3.jpg') },
        { id: 3, slideImg: require('../../assets/slide/slide4.jpg') },
        { id: 4, slideImg: require('../../assets/slide/slide5.jpg') },
        { id: 5, slideImg: require('../../assets/slide/slide6.jpg') }
      ],
      // 热门推荐图片数据
      imgSong: {
        src1: require('../../assets/musicPopularNav/musicPopularContent1.jpg'),
        src2: require('../../assets/musicPopularNav/musicPopularContent2.jpg'),
        src3: require('../../assets/musicPopularNav/musicPopularContent3.jpg'),
        src4: require('../../assets/musicPopularNav/musicPopularContent4.jpg'),
        src5: require('../../assets/musicPopularNav/musicPopularContent5.jpg'),
        src6: require('../../assets/musicPopularNav/musicPopularContent6.jpg'),
        src7: require('../../assets/musicPopularNav/musicPopularContent7.jpg'),
        src8: require('../../assets/musicPopularNav/musicPopularContent8.jpg'),
        src9: require('../../assets/musicPopularNav/musicPopularContent9.jpg'),
        src10: require('../../assets/musicPopularNav/musicPopularContent10.jpg')
      },
      // 图片高度
      bannerHeight: '',
      // 新歌速递图片数据
      newRecordImg: {
        src1: require('../../assets/newRecord/newRecord1.jpg'),
        src2: require('../../assets/newRecord/newRecord2.jpg'),
        src3: require('../../assets/newRecord/newRecord3.jpg'),
        src4: require('../../assets/newRecord/newRecord4.jpg'),
        src5: require('../../assets/newRecord/newRecord5.jpg'),
        src6: require('../../assets/newRecord/newRecord6.jpg')
      }
    }
  },
  mounted() {
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
  // 根据浏览器可视窗口动态改变幻灯大小
  methods: {
    imgLoad() {
      this.$nextTick(() => {
        this.bannerHeight = this.$refs.bannerHeightRef[0].height
      })
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
.el-table {
  margin: 15px 0 50px 0;
}
</style>
