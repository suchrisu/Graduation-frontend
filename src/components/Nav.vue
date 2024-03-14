<template>
  <div class="nav">
    <div class="nav-menu-wrapper">
      <ul class="menu-list">
        <li
          v-for="(item, index) in menuList"
          :key="index"
          :class="{ activeNav: index == current }"
          @click="changeMenu(index)"
        >
          <div class="block"></div>
          <span class="iconfont" :class="item"></span>
        </li>
      </ul>
    </div>
    <el-popover
    placement="top"
    :width="260"
    trigger="hover"
    class="popover"
  >
  <template #reference>
    <div class="own-pic">
      <HeadPortrait :imgUrl="imgUrl" @click="showDrawer"></HeadPortrait>
    </div>
  </template>
  <template #default>
  <el-card class="card">
    <div class="cardItem">
      <HeadPortrait :imgUrl="imgUrl" @click="showDrawer" class="head"></HeadPortrait>
    </div>
    <div class="cardItem">
      <input
      type="text"
      class="inputName"
      :readonly="isReadonly"
      v-model="currentUser.userName"
      @blur="quitEdit"
      ref="popoverUserName"
    /> <el-icon class="edit" onmouseover="this.style.color='blue'"
    onmouseout="this.style.color='white'" @click="editUserName"><Edit/></el-icon></div>
    
    <div class="cardItem">
      <el-button plain type="primary">修改密码</el-button>
      <el-button plain type="danger" @click="logOut">退出登录</el-button>
    </div>
  </el-card>
</template>
</el-popover>

  </div>
  <div>
    <!-- <el-drawer
    v-model="drawer"
    title="个人中心"
    direction="ltr"
    size="27%"
    :before-close="handleClose"
  > -->
  
  
   
  <!-- </el-drawer> -->
  </div>
</template>

<script>
import HeadPortrait from './HeadPortrait.vue'
import {sessionStorageGet,sessionStorageClearAll,sessionStorageSet, loadingWindow} from "@/util/util"
import api from "@/api/index"
export default {
  components: {
    HeadPortrait,
  },
  data() {
    return {
      menuList: [
        'icon-xinxi',
        // "icon-shipin",
        'icon-shu',
        'icon-shandian',
        'icon-shezhi',
      ],
      current: 0,
      imgUrl: require('@/assets/img/userHeader.jpg'),
      drawer: true,
      currentUser:"",
      isReadonly: true,
      oldName: ""
    }
  },
  mounted(){
    this.currentUser = sessionStorageGet("currentUser")
    this.oldName = this.currentUser.userName
  },
  methods: {
    logOut(){
      const loading = loadingWindow();
      api.logOut().then(
        res=>{
          if(res.data.code==1){
            sessionStorageClearAll();
            this.$message.success("已退出!")
            this.$router.push("/")
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
    quitEdit(){
      const loading = loadingWindow()
      api.updateUser(this.currentUser).then(
        res=>{
          if(res.data.code==1){
            sessionStorageSet('currentUser',this.currentUser)
            this.$message.success("修改成功!")
          }
          else{
            this.$message.error(res.data.message)
            this.currentUser.userName = this.oldName
          }
          
        }
      ).catch(err=>{
        this.$message.error(err.message)
      }).finally(()=>{
        loading.close()
      })
    },

    editUserName(){
      this.isReadonly = false
      this.$refs.popoverUserName.focus()
    },
    // showDrawer(){
    //   this.drawer = true;
    // },
    changeMenu(index) {
      switch (index) {
        case 0:
          this.$router.push(
            {
              name: 'ChatHome',
            },
            () => {}
          )
          break
        case 1:
          this.$message('该功能还没有开发哦，敬请期待一下吧~🥳')
          break
        case 2:
          this.$message('该功能还没有开发哦，敬请期待一下吧~🥳')
          break
        case 3:
          this.$message('该功能还没有开发哦，敬请期待一下吧~🥳')
          break
        case 4:
          this.$message('该功能还没有开发哦，敬请期待一下吧~🥳')
          break
        default:
          this.$router.push({
            name: 'ChatHome',
          })
      }

      this.current = index
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 100vh;
  position: relative;
  border-radius: 20px 0 0 20px;
  .nav-menu-wrapper {
    position: absolute;
    top: 40%;
    transform: translate(0, -50%);
    .menu-list {
      margin-left: 10px;

      li {
        margin: 40px 0 0 30px;
        list-style: none;
        cursor: pointer;
        position: relative;
        .block {
          background-color: rgb(29, 144, 245);
          position: absolute;
          left: -40px;
          width: 6px;
          height: 25px;
          transition: 0.5s;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          opacity: 0;
        }
        &:hover {
          span {
            color: rgb(29, 144, 245);
          }
          .block {
            opacity: 1;
          }
        }
      }
    }
  }
  .own-pic {
    cursor: pointer;
    position: absolute;
    bottom: 5%;
    margin-left: 25px;
  }
}
.activeNav {
  span {
    color: rgb(29, 144, 245);
  }
  .block {
    opacity: 1 !important;
  }
}

.head{
  cursor: pointer;

}

.cardItem{
  margin: 15px 15px;
  display: flex;
  align-items: center; 
  justify-content: center;
}

.inputName{
  position: relative;
  text-align: center;
  left:50%;
  font-size: 16px;
  height: 50px;
  width: 90%;
  transform: translate(-50%);
  background-color: rgb(29,30,31);
  border: 0px;
  outline: none;
  

}

.card{
  position: relative;
  background-color: rgb(29,30,31);
  border: 0;
  margin: 0;
  box-shadow: none;
}

.edit{
  margin-left: 15px;
  position: relative;
  cursor: pointer;
  
}
.popover{
  display: flex;
  align-items: center; 
  justify-content: center;
  padding: 0;
}

</style>
