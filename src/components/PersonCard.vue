<template>
  <div class="person-card" :class="{ activeCard: session.sessionId == current }">
    <div class="info">
          <HeadPortrait :imgUrl="session.headImg"></HeadPortrait>
          <div class="info-detail">
            <div class="name"><input type="text"  class="inputName" :class="{ activeInputName: !isReadonly }" :readonly="isReadonly" v-model="session.sessionName"
              @blur="quitEdit(session)" ref="inputName"></div>
            <div class="detail">{{ session.sessionDetail }}</div>
          </div>
          <div>
            <div class="edit">
              <i class="el-icon-edit" style="color: white" onmouseover="this.style.color='black'"
              onmouseout="this.style.color='white'" @click="editSession"></i>
            </div>
            <div class="delete">
              <i class="el-icon-delete" style="color:white" onmouseover="this.style.color='red'"
              onmouseout="this.style.color='white'" @click="deleteSession(session.sessionId)"
              ></i>
            </div>
          </div>

    </div>
  </div>
</template>

<script>
import HeadPortrait from "./HeadPortrait.vue";
import {mapMutations} from "vuex"
import api from "@/api/index"
import { loadingWindow } from "@/util/util";
export default {
  props: {
    session: {
      default: {
      },
    },
    sessionCurrent: {
      default: ''
    }
  },
  components: {
    HeadPortrait,
  },
  data() {
    return {
      current: '',
      isReadonly: true ,
      oldName: ''
    }
  },
  watch: {
    sessionCurrent: function() {
      this.isActive()
    }
  },
  mounted(){
    this.oldName = this.session.sessionName
  },
  methods: {
    ...mapMutations(["removeSessionFromList"]),
    isActive() {
      this.current = this.sessionCurrent
    }
    ,
    editSession(){
      this.isReadonly = false
      this.$refs.inputName.focus()
    },
    deleteSession(sessionId){
      const loading = this.$loading(loadingWindow())
      api.removeSession(sessionId).then(res=>{
        if(res.data.code==1){
          this.removeSessionFromList(sessionId)
        }
        else{
          this.$message.error(res.data.message)
        }
      }).catch(err=>{
        this.$message.error(err.message)
      }).finally(()=>{
        loading.close()
      })
      
    },
    quitEdit(session){
      const loading = this.$loading(loadingWindow())
      api.setSessionName(session).then(res=>{
        if(res.data.code==1){
          this.isReadonly=true
        }
        else{
          this.session.sessionName = this.oldName
          this.$message.error(res.data.message)
        }
      }).catch(err=>{  
        this.session.sessionName = this.oldName
        this.$message.error(err.message)
      }).finally(()=>{
        loading.close()
      })
      
    }
  }
};
</script>

<style lang="scss" scoped>
.person-card {
  width: 250px;
  height: 80px;
  border-radius: 10px;
  background-color: rgb(50, 54, 68);
  position: relative;
  margin: 25px 0;
  cursor: pointer;
  .info {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    display: flex;
    .info-detail {
      margin-top: 5px;
      margin-left: 20px;
      .name {
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }
      .detail {
        color: #5c6675;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
      }
    }
  }
  &:hover {
    background-color: #1d90f5;
    transition: 0.3s;
    box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
    // box-shadow:  0 5px 20px rgba(251, 152, 11, .5);
    .info {
      .info-detail {
        .detail {
          color: #fff;
        }
      }
    }
  }
}
.activeCard {
    background-color: #1d90f5;
    transition: 0.3s;
    box-shadow: 3px 2px 10px 0px rgba(0, 136, 255);
    
    .info {
      .info-detail {
        .name{
          .inputName{
            background-color: #1d90f5;
            cursor: pointer;
          }
          .activeInputName{
            background-color: #1d90f5;
            cursor: text;
          }
        }
        .detail {
          color: #fff;
        }
      }
    }
}

.edit{
  margin-left: 10px;
  margin-right: 5px;
  float:right;
}

.delete{
  margin-top:10px;
  margin-left: 10px;
  margin-right: 5px;
  float:right;
}
.el-button{
  
}
.inputName{
  width: 90px;
  background-color: rgb(50, 54, 68);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 5px;
  color:white;
  border:0px;
  outline: none;
}

.activeInputName{
  width: 90px;
  background-color: rgb(50, 54, 68);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 5px;
  color:white;
  border:0px;
  outline: none;
  cursor: text;
  
}

.person-card:hover .inputName{
  background-color: #1d90f5;
  transition: 0.3s;
  cursor: pointer;
}

.person-card:hover .activeInputName{
  background-color: #1d90f5;
  transition: 0.3s;
  cursor: text;
}

</style>