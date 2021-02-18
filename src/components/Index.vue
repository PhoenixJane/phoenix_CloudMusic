<template>
  <div>
    <el-container>
      <el-header>
        <!-- 头部区域 -->
        <div id="headerMenu">
          <div class="headerIcon" @click="toIndex">
            <img src="../assets/icon.png" />
            <span>音乐的力量</span>
          </div>
          <!-- nav导航栏 -->
          <el-menu default-active="1" class="el-menu-nav" mode="horizontal" background-color="#1e1e1e" text-color="#fff" active-text-color="#ffd04b">
            <!-- 导航栏选项 -->
            <el-menu-item index="1"><router-link to="/Mainarea">发现网抑</router-link></el-menu-item>
            <el-menu-item index="2"><a href="javascript:;">我的音乐</a></el-menu-item>
            <el-menu-item index="3"><a href="javascript:;">朋友</a></el-menu-item>
            <el-menu-item index="4"><a href="javascript:;">商城</a></el-menu-item>
          </el-menu>
          <!-- 搜索框与用户头像 -->
          <div class="headerUser">
            <el-input placeholder="音乐/视频/电台/用户" size="small">
              <el-button slot="append" icon="el-icon-search" size="mini"></el-button>
            </el-input>
            <div id="loginArea" @click="login">
              <el-avatar :src="privateProfileData.avatarUrl"></el-avatar>
              <span>{{ this.privateProfileData.nickName }}</span>
            </div>
          </div>
        </div>
      </el-header>
      <!-- 主体区域 -->
      <el-main>
        <!-- 发现网抑视图 -->
        <router-view></router-view>
      </el-main>
      <!-- 底部区域 -->
      <el-footer> </el-footer>
    </el-container>

    <!-- 登录弹窗 -->
    <div id="emailLoginArea">
      <el-dialog width="500px" :visible.sync="emailVisible" :center="true" title="欢迎登录网抑云音乐">
        <!-- 用tab组件展示邮箱登录部分 -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="邮箱登录" name="email">
            <el-form :model="emailRuleForm" :rules="emailRules" ref="emailRuleFormRef" label-width="60px">
              <el-form-item label="账号" prop="email">
                <el-input v-model="emailRuleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="emailRuleForm.password" type="password"></el-input>
              </el-form-item>
            </el-form>
            <div class="dialogFooter">
              <el-button type="primary" @click="emailLogin">登 录</el-button>
              <el-button @click="emailClose">取消</el-button>
            </div>
          </el-tab-pane>
          <!-- 用tab组件展示手机登录部分 -->
          <el-tab-pane label="手机登录" name="phone">
            <el-form :model="phoneRuleForm" :rules="phoneRules" ref="phoneRuleFormRef" label-width="60px">
              <el-form-item label="手机" prop="phoneName">
                <el-input v-model="phoneRuleForm.phoneName"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="phonePassword">
                <el-input v-model="phoneRuleForm.phonePassword" type="password"></el-input>
              </el-form-item>
            </el-form>
            <div class="dialogFooter">
              <el-button type="primary" @click="phoneVisible = false">登 录</el-button>
              <el-button @click="phoneVisible = false">取消</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
        <!-- 注册邮箱的地址 -->
        <a href="https://zc.reg.163.com/regInitialized#/" target="_blank">> 如无账号，请注册</a>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      emailVisible: false,
      phoneVisible: false,
      activeName: 'email',
      emailRuleForm: {
        email: '',
        password: ''
      },
      phoneRuleForm: {
        phoneName: '',
        phonePassword: ''
      },
      emailRules: {
        email: [
          { required: true, message: '请输入邮箱名', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      },
      phoneRules: {
        phoneName: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在 11 个数字', trigger: 'blur' }
        ],
        phonePassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      },
      privateProfileData: {}
    }
  },
  created() {
    this.getPrivateProfileData()
  },
  methods: {
    // 点击左上角logo跳转首页
    toIndex() {
      this.$router.push('/mainarea')
    },
    // 点击右上角登录部分显示登录弹窗
    login() {
      this.emailVisible = true
    },
    // 获取登录数据
    emailLogin() {
      this.$refs.emailRuleFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        const res = await this.axios.post('/login', this.emailRuleForm)
        if (res.data.code !== 200) {
          return this.$message.error('登录失败，请检查用户名或密码！')
        }
        this.$message.success('登录成功，欢迎来到网抑云！')
        console.log(res)
        this.$store.commit('saveProfile', res.data.profile)
        this.$store.commit('setToken', res.data.token)
        this.$store.commit('setProfile')
        this.privateProfileData = this.$store.state.profile
        this.emailVisible = false
      })
    },
    getPrivateProfileData() {
      const tokenStr = window.localStorage.getItem('token')
      if (tokenStr === null) {
        this.privateProfileData = this.$store.state.profile
        console.log(this.privateProfileData)
      } else {
        this.privateProfileData = JSON.parse(window.localStorage.getItem('profile'))
        console.log(this.privateProfileData)
      }
    },
    emailClose() {
      this.$refs.emailRuleFormRef.resetFields()
      this.$refs.phoneRuleFormRef.resetFields()
      this.emailVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
.el-header {
  height: 70px !important;
  background-color: #1e1e1e;
}
.el-main {
  width: 1200px;
  margin: 0 auto;
  padding: 0;
}
.el-footer {
  height: 170px !important;
  background-color: #f2f2f2;
  border-top: 1px solid #d3d3d3;
}
.headerIcon {
  width: 175px;
  margin-right: 40px;
  cursor: pointer;
}
#headerMenu {
  width: 1080px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  span {
    font-size: 22px;
    color: #fff;
    line-height: 70px;
    letter-spacing: 2px;
    vertical-align: middle;
  }
  img {
    vertical-align: middle;
    margin-right: 10px;
  }
  .el-menu-nav {
    width: 50%;
    height: 70px;
    a {
      font-size: 17px;
    }
    li {
      line-height: 70px;
      height: 100%;
    }
  }
  .headerUser {
    display: flex;
    align-items: center;
    .el-input {
      width: 140%;
      margin-right: 20px;
    }
  }
  #loginArea {
    cursor: pointer;
    width: 100%;
    .el-avatar {
      margin-right: 15px;
    }
    span:nth-child(2) {
      width: 72px;
      font-weight: 400;
      font-size: 16px;
      color: #787878;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

#emailLoginArea {
  position: relative;
  .dialogFooter {
    display: flex;
    justify-content: center;
    /deep/ .el-button {
      width: 100px;
    }
    /deep/ .el-button:nth-child(odd) {
      margin-right: 50px;
    }
  }
  /deep/ .el-dialog__body {
    padding: 10px 25px 30px;
  }
  a {
    position: absolute;
    font-size: 12px;
    color: #d3d3d3;
    right: 10px;
    bottom: 10px;
  }
}
</style>
