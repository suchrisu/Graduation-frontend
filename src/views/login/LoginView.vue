<template>
    <div>
     <el-row>
        <el-col :span="12"><div class="left">
            <img src="../../assets/loginAside.jpeg" alt="" class="img">
        </div></el-col>
        <el-col :span="12"><div class="right">
              <LoginForm class="LoginForm"></LoginForm>
        </div></el-col>
      </el-row>
      
    </div>
</template>


<script>
import LoginForm from '@/components/login/LoginForm.vue';
export default{
    name: "LoginView",
    components:{
        LoginForm
    },
    data() {
      return {
        labelPosition: "top",
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    }
}
</script>

<style scoped>
.left{
    width: 100%;
    height: 100vh;
}

.right{
    width: 100%;
    height: 100vh;
}
.img{
    width: 100%;
    height: 100%;
    border: 0;
    margin: 0;
    object-fit: cover;
    float:left;
}
.LoginForm{
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 60%;
    height: 80%;
    background-color: red;
    float: left;
}
</style>


