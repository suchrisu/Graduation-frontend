<template>
  <div class="home">
    <el-container height="100%">
      <el-aside width="100px">
        <Nav></Nav>
      </el-aside>
      <el-main>
        <div class="title">
          <h1>智慧政务交互系统</h1>
          
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'
import {mapState,mapMutations} from 'vuex'
import api from "@/api/index"
export default {
  name: 'App',
  components: {
    Nav,
  },
  computed:{
    ...mapState(["currentUser"])
  },
  methods:{
    ...mapMutations(["setUserHeader"])
  },
  mounted(){
    var url = api.getHeader(this.currentUser.userHeader);
    console.log("url",url)
    this.setUserHeader(url);
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-color: rgb(39, 42, 55);
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.title {
  color: #fff;
  padding-left: 10px;
  position: absolute;
  width: 200px;
  z-index: 9999;
}
</style>
