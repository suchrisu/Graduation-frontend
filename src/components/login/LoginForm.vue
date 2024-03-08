<template> 
    <div class="loginForm">
    <el-form :label-position="labelPostion" ref="form" :model="form" >
        <el-form-item label="登录角色">
            <el-select v-model="form.rolePowerId" placeholder="请选择登录角色"> 
              <el-option label="普通用户" value="2"></el-option>
              <el-option label="管理员" value="1"></el-option>
            </el-select>
          </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="form.userId" placeholder="请输入注册时的邮箱" class="userIdInput"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
            <el-input v-model="form.userPassword" show-password placeholder="请输入密码" class="userPasswordInput"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="form.userId" placeholder="请输入验证码" class="codeInput"></el-input>
          </el-form-item>
        <el-form-item>
            <el-button type="primary" round>登录</el-button>
        </el-form-item> 
      </el-form>
    </div>
</template>
  <script>
    export default {
     name: "LoginForm",

      data() {
        return {
          labelPostion:"top",
          form: {
            userId: '',
            userPassword: '',
            rolePowerId: '2',
          }
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        }
      }
    }
  </script>

<style scoped>

.userIdInput{
 
}
.userPasswordInput{

}


.codeInput{
    width: 50%;
}
.el-select{
    width: 40%;
}
.el-form-item{
    margin-top: 15px;
    margin-bottom: 10px;
    position: relative;
    left: 50%;
    width: 85%;
    transform: translate(-50%);
    height: auto;
}



.el-button{
    margin-top: 20px;
    width: 40%;
    position: relative;
    left: 50%;
    transform: translate(-50%);
}

</style>