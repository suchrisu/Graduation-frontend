<template>
  <div>
    <el-form
      :label-position="labelPostion"
      ref="form"
      :model="user"
      :rules="rules"
      size="large"
    >
      <el-form-item label="登录角色" class="select">
        <el-select v-model="user.rolePowerId" placeholder="请选择登录角色">
          <el-option label="普通用户" value="2"></el-option>
          <el-option label="管理员" value="1"></el-option>
        </el-select>
      </el-form-item>



      <el-form-item label="邮箱" prop="userId" v-if="user.rolePowerId==2">
        <el-input
          v-model="user.userId"
          placeholder="请输入注册时的邮箱"
          class="userIdInput"
        ></el-input>
      </el-form-item>

      <el-form-item label="用户名" prop="managerUserId" v-else>
        <el-input
          v-model="user.userId"
          placeholder="请输入管理员的用户名"
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
      <el-form-item label="验证码" prop="codeProp">
        <el-input v-model="code" placeholder="请输入验证码" class="codeInput">
        </el-input>
        <img :src="codeurl" alt="" class="codeImage" @click="getCode" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round plain @click="login('form')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '../../api/index'
import {
  sessionStorageGet,
  sessionStorageSet,
  loadingWindow,
  toMd5,
  deepClone
} from '@/util/util'
import {ElMessage} from 'element-plus'
import {mapMutations, mapState} from 'vuex'
export default {
  name: 'LoginForm',

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
      if (value != '') {
        return cb()
      }
      cb(new Error('请输入密码!'))
    }
    var checkCode = (rule, value, cb) => {
      if (this.code != '') {
        return cb()
      }
      cb(new Error('请输入验证码!'))
    }
    var checkManagerId = (rule,value,cb) => {
      if(this.user.userId != null && this.user.userId != ''){
        return cb()
      }
      cb(new Error('请输入用户名!'))
    }
    return {
      codeurl: 'http://localhost/login/loginCode',
      labelPostion: 'top',
      user: {
        userId: '',
        userPassword: '',
        rolePowerId: '2',
        userName: '',
      },
      code: '',
      rules: {
        userId: [{ validator: checkEmail, trigger: 'blur' }],
        userPassword: [{ validator: checkPassword, trigger: 'blur' }],
        codeProp: [{ validator: checkCode, trigger: 'blur' }],
        managerUserId: [{validator: checkManagerId, trigger: 'blur'}]
      },
    }
  },
  watch:{
    'user.rolePowerId': {
      handler(){
        this.user.userId = "";
    }
  }
  },

  methods: {
    ...mapMutations(["setCurrentUser","setUserHeader"]),
    getCode() {
      this.codeurl =
        'http://localhost/login/loginCode' + '?random=' + Math.random()
    },
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loading = loadingWindow();
          let loginUser = deepClone(this.user);
          loginUser.userPassword = toMd5(this.user.userPassword)
          api
            .login(this.code, loginUser)
            .then((res) => {
              let currentUser = res.data.data;
                this.setCurrentUser(currentUser);
                sessionStorageSet('token',res.data.message);
                if(currentUser.rolePowerId < 2){
                  this.$router.push({
                    name: "Manager"
                  })
                }
                else{this.$router.push({
                  name: 'Home',
                })}
                this.$message.success('欢迎' + res.data.data.userName + '!') 
            })
            .catch((err)=>{ 
              ElMessage.error(err.message)
        })
            .finally(() => {
              loading.close()
            })
          this.butonLoading = false
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style scoped>
.userIdInput {
}
.userPasswordInput {
}
.codeImage {
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
.el-select {
  width: 40%;
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
.el-button {
  margin-top: 15px;
  width: 40%;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}
.el-form {
  position: relative;
  left: 50%;
  top: 30%;
  padding-top: 5px;
  transform: translate(-50%, -30%);
  width: 100%;
}
.select {
  margin-top: 20px;
  
}
</style>
