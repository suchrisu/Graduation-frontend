<template> 
    <div>
    <el-form :label-position="labelPostion" ref="form" :model="user" >
        <el-form-item label="邮箱">
          <el-input v-model="user.userId" placeholder="请输入正确的邮箱" class="userIdInput"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
            <el-input v-model="user.userPassword" show-password placeholder="请输入密码" class="userPasswordInput"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" >
            <el-input v-model="userCheckPassword" show-password placeholder="请确保两次输入的密码一致" class="userPasswordCheckInput"></el-input>
          </el-form-item>
          <el-form-item label="注册码">
            <el-input v-model="code" placeholder="请输入注册码" class="codeInput">
            </el-input>
            <el-button type="primary" plain class="sendCodeButton" @click="sendRegisterCode" :disabled="buttonDisabled">{{sendCodeText}}</el-button>
          </el-form-item>
        <el-form-item>
            <el-button type="primary" round plain class="registerButton" @click="register">注册</el-button>
        </el-form-item> 
      </el-form>
    </div>
</template>
  <script>
  import {api} from "../../api/index"
    export default {
     name: "RegisterForm",

      data() {
        return {
          labelPostion:"top",
          user: {
            userId: '',
            userPassword: '',
            rolePowerId: '2',
            userName:""
          },
          code:"",
          userCheckPassword: "",
          buttonDisabled: false,
          interval: null,
          time: "",
          sendCodeText: "发送注册码",
        }
      },
      methods: {
        sendRegisterCode(){
            const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
            api.sendRegisterCode(this.user.userId).then(
                res=>{
                    if(res.data.code==1){
                        this.time=60 
                    this.interval=setInterval(()=>{
                        this.sendCodeText = "发送注册码"+"("+this.time+"s)"
                        this.time=this.time-1

            },1000)
                    console.log(res.data);
                    this.$message.success("发送成功!")
                    }
                    else{
                        this.$message.error(res.data.message)
                    }
                }
            ).catch(err=>{
                this.$message.error(err.message)
            }).finally(()=>{
                loading.close()
            })
        },
        register(){
            const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
            this.user.userName = this.user.userId
            api.register(this.code,this.user).then(
                res=>{
                    this.$router.go(0)
                    if(res.data.code==1){
                        this.$message.success("注册成功!")
                    }
                    else{
                        this.$message.error(res.data.message)
                    }
                }
            ).catch(err=>{
                this.$message.error(error.message)
            }).finally(()=>{
                loading.close()
            })
        }
      },
      watch:{
        time(newValue,oldValue){
            if(newValue==60){
                this.buttonDisabled=true
               
            }
            if(newValue==-1){
                clearInterval(this.interval)
                this.buttonDisabled = false
                this.sendCodeText = "发送注册码"
            }
        }
      }
    }
  </script>

<style scoped>


.sendCodeButton{
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

.el-form-item{
    margin-top: 5px;
    margin-bottom: 0px;
    position: relative;
    left: 50%;
    width: 90%;
    transform: translate(-50%);
    height: auto;
}



.registerButton{
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
}

</style>