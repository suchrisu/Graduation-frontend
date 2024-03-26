<template>
    <div class="managerHome">
    <div class="left">
            <el-menu
              class="menu"
              @open="handleOpen"
              @close="handleClose"
              @select="handleSelect"
              router="true"
              
            >
              <el-sub-menu index="/home/manager/userManage">
                <template #title>
                  <span class="iconfont"  :class="userManagerIcon"></span>
                  <span>用户管理</span>
                </template>
                  <el-menu-item index="/home/manager/userManage/manager">
                    <span class="iconfont"  :style="{color: currentIndex=='/home/manager/userManage/manager'? '#4090ff':''}" :class="managerIcon" id="managerIcon"></span>
                     <span>管理员</span>
                </el-menu-item>
                  <el-menu-item index="/home/manager/userManage/user">
                    <span class="iconfont" :style="{color: currentIndex=='/home/manager/userManage/user'? '#4090ff':''}" :class="userIcon" id="userIcon" ></span>
                    <span>普通用户</span></el-menu-item>
              </el-sub-menu>
              <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>Navigator Two</span>
              </el-menu-item>
              <el-menu-item index="3">
                <el-icon><setting /></el-icon>
                <span>Navigator 3</span>
              </el-menu-item>
            </el-menu>
    </div>
    <div class="right">
        <router-view></router-view>
    </div>
</div>
</template>


<script>
export default {
    name: "ManagerView",
    data(){
        return{
            userManagerIcon:"icon-yonghuguanli",
            managerIcon: "icon-guanliyuan",
            userIcon: "icon-yonghu",
            currentIndex:""
        }
    },
    mounted(){

    },
    methods:{
        handleSelect(index,indexPath,item){
            this.currentIndex = index;
        }
    }
}
</script>

<style scoped>
.managerHome{
    display: flex;

}
.left{
    margin-top: 70px;
    margin-left: 10px;
    display: flex;
    float: left;
    justify-content: center;
}
.menu{
    height: 80vh;
}
.iconfont{
    margin-right: 6px;
    color: rgb(229,234,243);
}



 #managerIcon{
    font-size: 18px;
    
}
#userIcon{
    font-size: 20px;
}
.right{
  display: flex;
  float: right;
}
</style>