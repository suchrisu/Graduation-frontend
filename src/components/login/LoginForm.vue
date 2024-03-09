<template> 
    <div>
    <el-form :label-position="labelPostion" ref="form" :model="user">
        <el-form-item label="登录角色"  class="select">
            <el-select v-model="user.rolePowerId" placeholder="请选择登录角色"> 
              <el-option label="普通用户" value="2"></el-option>
              <el-option label="管理员" value="1"></el-option>
            </el-select>
          </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="user.userId" placeholder="请输入注册时的邮箱" class="userIdInput"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
            <el-input v-model="user.userPassword" show-password placeholder="请输入密码" class="userPasswordInput"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="code" placeholder="请输入验证码" class="codeInput">
            </el-input>
            <img :src="codeurl" alt="" class="codeImage" @click="getCode">
          </el-form-item>
        <el-form-item>
            <el-button type="primary" round plain @click="login" :loading="buttonLoading">登录</el-button>
        </el-form-item> 
      </el-form>
    </div>
</template>

  <script>
  import {api} from "../../api/index"
    export default {
     name: "LoginForm",

      data() {
        return {
          codeurl:"http://localhost/user/loginCode",
          labelPostion:"top",
          user: {
            userId: '',
            userPassword: '',
            rolePowerId: '2',
            userName:""
          },
          code: "",
          butonLoading: false
        }
      },
      methods: {
        getCode(){
          this.codeurl="http://localhost/user/loginCode"+"?random="+Math.random()
        },
        login(){
          this.butonLoading=true
          api.login(this.code,this.user).then(res=>{
            console.log(res.data);
          })
          this.butonLoading=false
          
        }
      }
    }
  </script>

<style scoped>

.userIdInput{
 
}
.userPasswordInput{

}

.codeImage{
  width: 50%;
  height: 39px;
  border: 0;
  margin-top: 1px;
  float: right;
  border-radius: 4px;
  border-left: 0px;
}
.codeInput{
    width: 50%;
    border-right: 0px;
}
.el-select{
    width: 40%;
}
.el-form-item{
    margin-top: 5px;
    margin-bottom: 0px;
    position: relative;
    left: 50%;
    width: 90%;
    transform: translate(-50%);
    height: auto;
}




.el-button{
    margin-top: 15px;
    width: 40%;
    position: relative;
    left: 50%;
    transform: translate(-50%);
}


.el-form{
  position: relative;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-30%);
    width: 100%;
}

.select{
  height: 90px;
}

</style>