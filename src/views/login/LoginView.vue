<template>
  <div class="background">
    <el-row>
      <el-col :span="12"><div class="left"></div></el-col>
      <el-col :span="12"
        ><div class="right">
          <el-tabs type="border-card" :stretch="true">
            <el-tab-pane label="用户登录">
              <LoginForm class="Form"></LoginForm>
            </el-tab-pane>
            <el-tab-pane label="用户注册">
              <RegisterForm class="Form"></RegisterForm>
            </el-tab-pane>
          </el-tabs></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import LoginForm from '@/components/login/LoginForm.vue'
import RegisterForm from '@/components/login/RegisterForm.vue'
export default {
  name: 'LoginView',
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.background {
  width: 100%;
  height: 100vh;
  background-image: url(../../assets/bg1.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}
.left {
  width: 100%;
  height: 100vh;
  float: left;
}
.right {
  width: 100%;
  height: 100vh;
  float: right;
}
.img {
  width: 100%;
  height: 100%;
  border: 0;
  margin: 0;
  object-fit: cover;
  float: left;
}
.Form {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 25%);
  width: 100%;
  height: 70%;
  margin: 0;
}
.RegisterForm {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 78%;
  background-color: rgba(236, 242, 244, 0.943);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}

.el-tabs {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 85%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 0;
}


</style>
