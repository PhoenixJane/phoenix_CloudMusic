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
          <el-menu :default-active="activeIndexData" class="el-menu-nav" mode="horizontal" background-color="#1e1e1e" text-color="#fff" active-text-color="#ffd04b" router>
            <!-- 导航栏选项 -->
            <el-menu-item :key="i" :index="item.index" v-for="(item, i) in menuInfo" @click="activeIndex(item.index)">
              {{ item.p }}
            </el-menu-item>
          </el-menu>
          <!-- 搜索框与用户头像 -->
          <div class="headerUser">
            <el-input placeholder="偷个懒^_^" size="small" disabled>
              <el-button slot="append" icon="el-icon-search" size="mini" disabled></el-button>
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
      <el-footer>
        <div class="page-container">
          <div>Copyright 2021 © XXXX MUSIC GROUP. XXXXXXXX公司版权所有 <span>[粤ICP备XXXXXXXX号-X]</span></div>
          <div>
            <span>信息网络传播视听许可证: XXXXX</span>| <span>粤公网安备: XXXXXXXXXXXX号</span>| <span>增值电信业务经营许可证: 粵XX-XXXXXXXX</span>|
            <span>网络文化经营许可证号码: 粤网文[XXXX]XXXXX号</span>
          </div>
          <div>
            <span>举报邮箱: XXXXX@XXX.com</span>|
            <span>反馈中心</span>
          </div>
        </div>
      </el-footer>
    </el-container>

    <!-- 登录弹窗 -->
    <div id="emailLoginArea">
      <el-dialog width="500px" :visible.sync="$store.state.emailVisible" :center="true" title="欢迎登录网抑云音乐">
        <!-- 用tab组件展示邮箱登录部分 -->
        <el-tabs v-model="activeName" @tab-click="resetClick">
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
              <el-form-item label="手机" prop="phone">
                <el-input v-model="phoneRuleForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="phoneRuleForm.password" type="password"></el-input>
              </el-form-item>
            </el-form>
            <div class="dialogFooter">
              <el-button type="primary" @click="phoneLogin">登 录</el-button>
              <el-button @click="emailClose">取消</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
        <!-- 注册邮箱的地址 -->
        <a href="https://zc.reg.163.com/regInitialized#/" target="_blank">> 如无账号，请注册</a>
      </el-dialog>
      <!-- 登出弹窗 -->
      <el-dialog title="提示" :visible.sync="logoutDialogVisible" width="30%">
        <span>你确认要退出网抑云音乐么？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="logoutDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="clear">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  // 注入依赖
  inject: ['reload'],
  data() {
    return {
      // 登录界面默认显示部分
      activeName: 'email',
      // 邮箱登录表单数据
      emailRuleForm: {
        email: '',
        password: ''
      },
      // 手机登录表单数据
      phoneRuleForm: {
        phone: '',
        password: ''
      },
      // 邮箱账号与密码验证规则
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
      // 手机账号与密码验证规则
      phoneRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在 11 个数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      },
      // 用户基本信息
      privateProfileData: {},
      // nav栏信息
      menuInfo: [
        { index: '/mainarea', p: '发现网抑' },
        { index: '/mymusic', p: '我的音乐' },
        { index: '/hotmusic', p: '热门音乐' },
        { index: '/download', p: '客户端' }
      ],
      // nav栏默认选项数据
      activeIndexData: '/mainarea',
      // 控制网抑云退出弹窗
      logoutDialogVisible: false
    }
  },
  created() {
    this.getPrivateProfileData()
    this.getActiveIndex()
  },
  methods: {
    // 点击左上角logo跳转首页
    toIndex() {
      // 当点击logo时，保存nav栏的默认参数
      this.activeIndexData = '/mainarea'
      window.sessionStorage.setItem('active', JSON.stringify(this.activeIndexData))
      // 防止多次跳转当前路由，浪费资源
      if (this.$route.path !== '/mainarea') {
        this.$router.push('/mainarea')
      }
    },
    // 点击右上角登录部分显示登录弹窗
    login() {
      const tokenStr = window.localStorage.getItem('token')
      if (!tokenStr) {
        this.$store.commit('changeEmailVisible')
      } else {
        this.logoutDialogVisible = true
      }
    },
    // 从网易邮箱登录并获取数据
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
        console.log(this.$store.state.pleaseLoginInfo)
        console.log(res)
        this.saveProfile(res)
      })
    },
    // 从手机登录并获取数据
    phoneLogin() {
      this.$refs.phoneRuleFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        const res = await this.axios.post('/login/cellphone', this.phoneRuleForm)
        if (res.data.code !== 200) {
          return this.$message.error('登录失败，请检查用户名或密码！')
        }
        this.$message.success('登录成功，欢迎来到网抑云！')
        console.log(res)
        this.saveProfile(res)
      })
    },
    // 以token为标志辨别是否为登录状态
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
    // 将个人数据保存在vuex中
    saveProfile(res) {
      // 在localStorage中保存token与个人数据
      this.$store.commit('saveProfile', res.data.profile)
      this.$store.commit('setToken', res.data.token)
      this.$store.commit('setProfile')
      this.privateProfileData = this.$store.state.profile
      this.$store.commit('changeEmailVisible')
      if (this.$store.state.pleaseLoginInfo) {
        this.$router.push('/mymusic')
        this.$store.commit('changePleaseLoginInfo', false)
      }
    },
    // 关闭dialog对话框
    emailClose() {
      this.resetClick()
      this.$store.commit('changeEmailVisible')
    },
    // 重置dialog中的input信息
    resetClick() {
      this.$refs.emailRuleFormRef.resetFields()
      this.$refs.phoneRuleFormRef.resetFields()
    },
    // 保存当前nav中用户点击的Index
    activeIndex(index) {
      window.sessionStorage.setItem('active', JSON.stringify(index))
      this.getActiveIndex()
    },
    // 获取当前SessionStorge中用户点击的Index
    getActiveIndex() {
      // 如果SessionStorge中没有数据，则置入1
      if (window.sessionStorage.getItem('active') === null) {
        window.sessionStorage.setItem('active', JSON.stringify('/mainarea'))
      }
      this.activeIndexData = JSON.parse(window.sessionStorage.getItem('active'))
    },
    clear() {
      window.localStorage.clear()
      window.sessionStorage.clear()
      this.logoutDialogVisible = false
      this.reload()
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
    border-bottom: none !important;
    li {
      line-height: 70px;
      height: 100%;
    }
    .el-menu-item {
      font-size: 17px;
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-avatar {
      margin-right: 15px;
    }
    span:nth-child(2) {
      width: 72px;
      font-weight: 400;
      font-size: 16px;
      color: #787878;
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

.page-container {
  margin-top: 40px;
  font-size: 13px;
  color: #909399;
  div {
    padding: 5px 0;
    text-align: center;
    span {
      margin: 0 10px;
    }
  }
}
</style>
