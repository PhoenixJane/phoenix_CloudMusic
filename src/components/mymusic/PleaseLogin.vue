<template>
  <div>
    <div id="myMusicLogin">
      <div class="loginWindow">
        <h1>登录网抑云</h1>
        <p>在这里你可以查看，管理，收藏自己的私房音乐。随时随地打开网抑云，纵享音乐的快乐！</p>
        <el-button type="primary" round @click="login">即刻登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {},
  methods: {
    login() {
      this.$store.commit('changeEmailVisible')
      this.$store.commit('changePleaseLoginInfo', true)
      console.log(this.$store.state.pleaseLoginInfo)
    }
  }
}
</script>
<style lang="less" scoped>
#myMusicLogin {
  position: relative;
  height: 729px;
  background: url('../../assets/LoginBg.jpg') no-repeat;
  .loginWindow {
    position: absolute;
    width: 750px;
    height: 300px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.4);
    h1 {
      margin: 100px 0 0 150px;
      font-weight: 400;
    }
    p {
      width: 400px;
      margin-left: 50px;
    }
    .el-button {
      position: absolute;
      right: 15%;
      bottom: 40%;
      font-size: 20px;
    }
  }
}
</style>
