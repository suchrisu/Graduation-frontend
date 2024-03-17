<template>
  <div>
    <el-form
      :label-position="labelPostion"
      ref="form"
      :model="user"
      status-icon
      :rules="rules"
      size="large"
    >
      <el-form-item label="邮箱" prop="userId">
        <el-input
          v-model="user.userId"
          placeholder="请输入正确的邮箱"
          class="userIdInput"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input
          v-model="user.userPassword"
          show-password
          placeholder="请输入密码"
          class="userPasswordInput"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="userCheckPassword">
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
          @click="sendRegisterCode"
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
          @click="register('form')"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import api from '../../api/index'
import { deepClone, loadingWindow, toMd5 } from '@/util/util'
export default {
  name: 'RegisterForm',

  data() {
    var checkEmail = (rule, value, cb) => {
      if (value == '') {
        return cb(new Error('请输入邮箱!'))
      }
      //验证邮箱的正则表达式
      const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (regEmail.test(value)) {
        //合法的邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱!'))
    }

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
      labelPostion: 'top',
      user: {
        userId: '',
        userPassword: '',
        rolePowerId: '2',
        userName: '',
        userHeader: "defaultHeader.png"
      },
      code: '',
      userCheckPassword: '',
      buttonDisabled: false,
      interval: null,
      time: '',
      sendCodeText: '发送验证码',
      rules: {
        userId: [{ validator: checkEmail, trigger: 'blur' }],
        userPassword: [{ validator: checkPassword, trigger: 'blur' }],
        userCheckPassword: [{ validator: checkCheckPassword, trigger: 'blur' }],
        code: [{ validator: checkCode, trigger: 'blur' }],
      },
    }
  },
  methods: {
    sendRegisterCode() {
      const loading = loadingWindow();
      api
        .sendRegisterCode(this.user.userId)
        .then((res) => {
            this.time = 60
            this.interval = setInterval(() => {
              this.sendCodeText = '发送验证码' + '(' + this.time + 's)'
              this.time = this.time - 1
            }, 1000)
            this.$message.success('验证码已发送到'+this.user.userId+"!")
        })
        .catch((err)=>{ 
          ElMessage.error(err.message)
        })
        .finally(() => {
          loading.close()
        })
    },
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loading = loadingWindow();
          this.user.userName = this.user.userId
          var loginUser = deepClone(this.user)
          loginUser.userPassword = toMd5(this.user.userPassword);
          api
            .register(this.code, loginUser)
            .then((res) => {
                this.$message.success('注册成功!')
                this.$router.go(0)
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

<style scoped>
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
