<template>
  <div>
    <div id="downloadPage">
      <div id="pc">
        <h2>在电脑上听</h2>
        <img src="../../assets/download/pcdownload.png" alt="" />
        <el-button @click="pcClick">下载客户端</el-button>
      </div>
      <div id="phone">
        <h2>在手机上听</h2>
        <img src="../../assets/download/phonedownload.png" alt="" />
        <el-popover placement="top-start" title="扫描二维码下载" width="200" trigger="click">
          <el-button slot="reference">下载移动端</el-button>
          <img src="../../assets/download/cloudMusicQcode.jpg" alt="" />
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    pcClick() {
      const a = document.createElement('a')
      a.href = 'https://d1.music.126.net/dmusic/cloudmusicsetup2.7.6.198710.exe'
      a.click()
    }
  }
}
</script>
<style lang="less" scoped>
#downloadPage {
  display: flex;
  justify-content: flex-start;
  margin: 119px 0;
  #pc {
    margin-right: 220px;
    h2 {
      text-align: center;
    }
    img {
      display: block;
      width: 557px;
      height: 331px;
      margin-bottom: 30px;
    }
    .el-button {
      display: block;
      margin: 0 auto;
      font-size: 20px;
      font-weight: 400;
      color: white;
      border-radius: 30px;
      padding: 20px 40px;
      background-color: #000;
    }
  }
  #phone {
    h2 {
      text-align: center;
    }
    img {
      display: block;
      width: 299px;
      height: 331px;
      margin-bottom: 30px;
    }
    .el-button {
      display: block;
      margin: 0 auto;
      font-size: 20px;
      font-weight: 400;
      color: white;
      border-radius: 30px;
      padding: 20px 40px;
      background-color: #000;
    }
  }
}
</style>
