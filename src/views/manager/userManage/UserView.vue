<template>   
    <div class="content">
        <div class="top">
          
          <el-input
          v-model="searchInput"
          style="max-width: 600px"
          placeholder="Please input"
          class="search"
          size="default"
          :prefix-icon="Search"
        >
          <template #prepend>
            <el-select v-model="searchSelect" placeholder="Select" class="selectSearch" size="default">
              <el-option label="用户名" :value="1" />
              <el-option label="昵称" :value="2" />
            </el-select>
          </template>
          <template #suffix>
            <el-icon class="sessionSearchIcon"><Search/></el-icon>
          </template>
        </el-input>
        <el-button class="deleteBatch" plain type="danger" :icon="Delete">批量删除</el-button>
        <el-button class="add" plain type="primary" :icon="Plus">添加用户</el-button>
        </div>
    <div class="center">
    <el-table
    ref="tableRef"
    @row-click="rowClick"
    :data="tableData"
    :highlight-current-row="true"
    :select-on-indeterminate="false"
    style="width: 100%"
    size="large"
    table-layout="auto"
    :header-cell-style="tableHeaderStyle"
    :cell-style="tableCellStyle"
    :row-style="rowStyle"
    @selection-change="handleSelectionChange"
    class="table"
  >
  <el-table-column  type="expand">
    <template #default="scope">
      <el-descriptions title="User Info">
        <el-descriptions-item label="用户名">{{ scope.row.userId}}</el-descriptions-item>
        <el-descriptions-item label="昵称">{{ scope.row.userName}}</el-descriptions-item>
        <el-descriptions-item label="注册时间">{{ scope.row.createTime }}</el-descriptions-item>
        <el-descriptions-item label="新密码">
          <el-input :width="100" size="small"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="确认密码"
          ><el-input :width="100" size="small"></el-input></el-descriptions-item
        >
      </el-descriptions>
    </template>
  </el-table-column>
    <el-table-column fixed type="selection" align="center" />
    <el-table-column type="index" align="center" />
    <el-table-column label="" align="center">
        <el-avatar :src="userIcon" shape="circle" :size="25" fit="cover"></el-avatar>
    </el-table-column>
    <el-table-column prop="userId" label="用户名" align="center">
    </el-table-column>
    <el-table-column property="userName" label="昵称"  align="center"/>
    <el-table-column  property="createTime" label="注册时间" align="center"/>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button plain type="primary" :icon="Edit" circle @click.stop="test(scope)"></el-button>
        <el-button plain type="danger" :icon="Delete" circle @click.stop></el-button>
      </template>
        
    </el-table-column>
  </el-table>
    </div>
    <div class="bottom">
      <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 50]"
      :small="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </div>
</div>
</template>

<script>
import HeadPortrait  from "@/components/HeadPortrait.vue"
import {Plus,Edit,Delete} from "@element-plus/icons-vue"
export default {
    name: 'UserView',
    components:{
        HeadPortrait
    },
    data(){
        return{
          Edit:Edit,
          Delete:Delete,
          Plus:Plus,
          currentPage: 1,
          pageSize: 5,
          totalCount: 20,
          searchInput:"",
          searchSelect: 1,
          tableHeaderClass: 'tableHeader',
            userIcon:require('@/assets/img/user.png'),
            tableData:[
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/12 12:00:00",

                },
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/13 12:00:00",

                },
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/12 12:00:00",

                },
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/12 12:00:00",

                },
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/12 12:00:00",

                },
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/12 12:00:00",

                },
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/12 12:00:00",

                },
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/12 12:00:00",

                },
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/12 12:00:00",

                },
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/12 12:00:00",

                },
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/12 12:00:00",

                },
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/12 12:00:00",

                },
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/12 12:00:00",

                },
                {
                    userId: "12345678",
                    userName: "sususu",
                    createTime: "2024/03/12 12:00:00",

                }
            ]
        }
    },
    methods:{
      test(scope){
        console.log(scope);
        this.$refs.tableRef.toggleRowExpansion(scope.row)
      },
      rowClick(row,column,event){
        console.log(row,column,event)
        this.$refs.tableRef.toggleRowSelection(row)
      },
      rowStyle(row){
        return {
          cursor: "pointer",
          height: "30px",
          borderBottomColor: "rgb(76,77,79)"
        }
      },
      tableCellStyle(data){
        if(data.columnIndex == 1){
          return {
          display: "None"
        }
        }
        
      },
        tableHeaderStyle(data){

            if(data.columnIndex == 1){
          return {
          display: "None"
        }
        }
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    width: 100%;
    height: 100%;
    margin-left: 30px;
    position: relative;
}
.top {
    margin-bottom: 5px;
    margin-left: 10px;
    &::after {
      content: "";
      display: block;
      clear: both;
    }
    .search{
      border-left: 0px;
      float: left;
      width: 30%;
      .selectSearch{
        width:95px;
        background-color:rgb(39,42,55);
        border-right: 0px;
      }
    }

   
    
}
.search{
  border-left: 0px;
  width: 70%;
  .selectSearch{
    width:95px;
    background-color:rgb(39,42,55);
    border-right: 0px;
  }
}
.center{
    width: 70vw;
}
.table{
  border-radius: 2px;
  box-shadow: --el-box-shadow-light;
  border-top: 0px solid;
  border-bottom-color: #9e9e9e;
  border-color: rgb(76,77,79);
  height: 500px;
  --el-table-row-hover-bg-color: rgb(50,54,68);
  --el-table-header-text-color: white;
  --el-table-text-color: white;
  --el-table-bg-color: rgb(39,42,55);
  --el-table-tr-bg-color: rgb(39,42,55);
  --el-table-header-bg-color:  rgb(39,42,55);
}
.el-table {
  
}
.bottom{
  margin-top:5px;
  display: flex;
  justify-content: center;
  align-items: center;

}
.deleteBatch{
  margin:0 5px;
  float: right;
}
.add{
  margin:0 5px;
  float: right;
}
</style>