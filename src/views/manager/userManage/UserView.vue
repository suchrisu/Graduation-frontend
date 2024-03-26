<template>   
    <div class="content">
        <div class="top">
            <div class="head-pic">
              <HeadPortrait :imgUrl="userIcon"></HeadPortrait>
            </div>
            <div class="info-detail">
              <div class="name">普通用户</div>
              <div class="detail"></div>
            </div>
        </div>
    <div class="center">
    <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    size="large"
    table-layout="auto"
    header-row-class-name="tableHeader"
    :header-cell-style="test"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" align="center"  />
    <el-table-column type="index" align="center" />
    <el-table-column label="头像" align="center">
        <el-avatar :src="userIcon" shape="circle" :size="35" fit="cover"></el-avatar>
    </el-table-column>
    <el-table-column prop="userId" label="用户名" align="center">
    </el-table-column>
    <el-table-column property="userName" label="昵称"  align="center"/>
    <el-table-column property="createTime" label="注册时间" align="center"/>
    <el-table-column label="操作" align="center">
        <el-button plain type="primary">修改</el-button>
        <el-button plain type="danger">删除</el-button>
    </el-table-column>
  </el-table>
    </div>
</div>
</template>

<script>
import HeadPortrait  from "@/components/HeadPortrait.vue"
export default {
    name: 'UserView',
    components:{
        HeadPortrait
    },
    data(){
        return{
            userIcon:require('@/assets/img/user.png'),
            tableData:[
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/12 12:00:00",

                }
            ]
        }
    },
    methods:{
        test(){
            return {
                backgroundColor: "white"
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    width: 100%;
    height: 100%;
    margin-left: 20px;
    position: relative;
}
.top {
    margin-bottom: 10px;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .head-pic {
      float: left;
    }
    .info-detail {
      float: left;
      margin: 5px 20px 0;
      .name {
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }
      .detail {
        color: #9e9e9e;
        font-size: 12px;
        margin-top: 2px;
      }
    }
}

.center{
    width: 70vw;
}
.tableHeader{
   background-color: white;
}

</style>