<template>
    <el-drawer
    v-model="drawer"
    title="修改密码"
    direction="ltr"
    size="27%"
    :before-close="handleClose"
    destroy-on-close="true"
    @close="close"
  > 
  <el-form
      :label-position="labelPostion"
      ref="form"
      :model="user"
      status-icon
      :rules="rules"
      size="large"
      
    >
      <el-form-item label="新密码" prop="userPassword">
        <el-input
          v-model="user.userPassword"
          show-password
          placeholder="请输入新密码"
          class="userPasswordInput"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="userCheckPassword">
        <el-input
          v-model="userCheckPassword"
          show-password
          placeholder="请确保两次输入的密码一致"
          class="userPasswordCheckInput"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="code" placeholder="请输入验证码" class="codeInput">
        </el-input>
        <el-button
          type="primary"
          plain
          class="sendCodeButton"
          @click="sendValidCode"
          :disabled="buttonDisabled"
          >{{ sendCodeText }}</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          round
          plain
          class="registerButton"
          @click="updateUserPassword('form')"
          >修改</el-button
        >
      </el-form-item>
    </el-form>
  
   
  </el-drawer>
</template>

<script>
import {loadingWindow,sessionStorageGet,sessionStorageClearAll,sessionStorageSet, toMd5} from "@/util/util"
import api from "@/api/index"
import {ElMessage} from 'element-plus'
export default{
    name:"ChangePassword",
    data() {
    var checkPassword = (rule, value, cb) => {
      if (value == '') {
        return cb(new Error('请输入密码!'))
      }
      const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      if (regPassword.test(value)) {
        return cb()
      }

      cb(new Error('密码最少八个字符，且包含大小写字母和数字!'))
    }

    var checkCheckPassword = (rule, value, cb) => {
      if (this.userCheckPassword == '') {
        return cb(new Error('请输入密码!'))
      }
      if (this.user.userPassword != this.userCheckPassword) {
        return cb(new Error('两次输入的密码不一致!'))
      }
      return cb()
    }
    var checkCode = (rule, value, cb) => {
      if (this.code != '') {
        return cb()
      }
      cb(new Error('请输入验证码!'))
    }
    return {
      drawer: false,
      labelPostion: 'top',
      currentUser:"",
      user:{
        userPassword: ""
      },
      code: '',
      userCheckPassword: '',
      buttonDisabled: false,
      interval: null,
      time: '',
      sendCodeText: '发送验证码',
      rules: {
        userPassword: [{ validator: checkPassword, trigger: 'blur' }],
        userCheckPassword: [{ validator: checkCheckPassword, trigger: 'blur' }],
        code: [{ validator: checkCode, trigger: 'blur' }],
      },
    }
  },
  watch:{
    drawerProps(){
      this.drawer = this.drawerProps;
    }
  },
  mounted(){
    this.currentUser = sessionStorageGet("currentUser")
    this.drawer = true;
  },
  methods: {
    close(){
      this.$emit("close")
    },
    sendValidCode() {
      const loading = loadingWindow();
      api
        .sendValidCode(this.currentUser.userId)
        .then((res) => {
            this.time = 60
            this.interval = setInterval(() => {
              this.sendCodeText = '发送验证码' + '(' + this.time + 's)'
              this.time = this.time - 1
            }, 1000)
            console.log(res.data)
            this.$message.success('验证码已发送到'+this.currentUser.userId+"!")
        })
        .catch((err)=>{ 
          ElMessage.error(err.message)
        })
        .finally(() => {
          loading.close()
        })
    },
    updateUserPassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loading = loadingWindow();
          this.currentUser.userPassword = toMd5(this.user.userPassword);
           api
            .updateUserPassword(this.code,this.currentUser)
            .then((res) => {
                this.$message.success('修改成功!')
                sessionStorageClearAll()
                this.$router.push({
                  path:"/"
                })
                this.$message.warning("你已修改密码,请重新登录!")
            })
            .catch((err)=>{ 
              ElMessage.error(err.message)
        })
            .finally(() => {
              loading.close()
            })
        } else {
          return false
        }
      })
    },
  },
  watch: {
    time(newValue, oldValue) {
      if (newValue == 60) {
        this.buttonDisabled = true
      }
      if (newValue == -1) {
        clearInterval(this.interval)
        this.buttonDisabled = false
        this.sendCodeText = '发送验证码'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sendCodeButton {
    width: 50%;
    height: 39px;
    border: 0;
    margin-top: 1px;
    float: right;
    border-radius: 4px;
    border-left: 0px;
  }
  .codeInput {
    width: 50%;
    border-right: 0px;
  }
  .el-form-item {
    margin-top: 20px;
    margin-bottom: 0px;
    position: relative;
    left: 50%;
    width: 90%;
    transform: translate(-50%);
    height: auto;
  }
  .registerButton {
    margin-top: 15px;
    width: 40%;
    position: relative;
    left: 50%;
    transform: translate(-50%);
  }
  .el-form {
    padding-top: 5px;
    position: relative;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -30%);
  }
</style>