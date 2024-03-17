<template>
  <div class="chatHome">
    <div class="chatLeft">
      <div class="title">
        <h1>智慧政务交互系统</h1>
      </div>
      <div class="online-person">
        <span class="onlin-text">会话列表</span>
        <span class="addSession">
          <el-button @click="addSession"><el-icon class="plusIcon"><Plus/></el-icon>新建会话</el-button>
        </span>
        <div class="person-cards-wrapper">
          <div
            class="personList"
            v-for="session in sessionList"
            :key="session.sessionId"
            @click="clickSession(session)"
          >
            <PersonCard
              :session="session"
              :sessionCurrent="sessionCurrent"
            ></PersonCard>
          </div>
        </div>
      </div>
    </div>
    <div class="chatRight">
      <!-- <router-view></router-view> -->
      <div v-if="showChatWindow">
        <ChatWindow
          :session="chatWindowInfo"
          @sessionCardSort="sessionCardSort"
        ></ChatWindow>
      </div>
      <div class="showIcon" v-else>
        <span class="iconfont icon-snapchat"></span>
        <!-- <img src="@/assets/img/snapchat.png" alt="" /> -->
      </div>
    </div>
    <!-- <el-col :span="4"><div class="grid-content bg-purple"></div></el-col> -->
  </div>
</template>

<script>
import PersonCard from '@/components/PersonCard.vue'
import ChatWindow from './chatwindow.vue'
import {Plus} from "@element-plus/icons-vue"
import { sessionStorageGet, getTime, loadingWindow, getDate } from '@/util/util'
import { mapState, mapMutations } from 'vuex'
import { nanoid } from 'nanoid'
import api from '@/api/index'
import {ElMessage} from 'element-plus'
export default {
  data() {
    return {
      sessionCurrent: '',
      showChatWindow: false,
      chatWindowInfo: {},
      Plus: Plus
    }
  },
  name: 'App',
  components: {
    PersonCard,
    ChatWindow
  },
  mounted() {
    const loading = loadingWindow()
    var url = api.getHeader(this.currentUser.userHeader);
    this.setUserHeader(url);
    api
      .getSessions()
      .then((res) => {
          this.setSessionList(res.data.data)
      })
      .catch((err)=>{ 
        ElMessage.error(err.message)
        })
      .finally(() => {
        loading.close()
      })
  },
  computed: {
    ...mapState(['sessionList',"currentUser"]),
  },
  watch: {
    sessionList() {
      if (this.sessionList.length == 0) {
        this.showChatWindow = false
      }
    },
  },
  methods: {
    ...mapMutations(['setSessionList',"setUserHeader"]),
    addSession() {
      let newSession = {
        sessionId: this.currentUser.userId + '_' + getTime(),
        sessionOwner: this.currentUser.userId,
        sessionName: '新会话',
        sessionFile: nanoid() + '.json',
        sessionLastTime: getTime(),
      }
      const loading = loadingWindow()
      api
        .addSession(newSession)
        .then((res) => {
            let sessionListTemp = this.sessionList
            sessionListTemp.unshift(newSession)
            this.setSessionList(sessionListTemp)
        })
        .catch((err)=>{ 
          ElMessage.error(err.message)
        })
        .finally(() => {
          loading.close()
        })
    },
    clickSession(session) {
      this.showChatWindow = true
      this.chatWindowInfo = session
      this.sessionCurrent = session.sessionId
    },
    sessionCardSort(id) {
      let sessionListTemp = this.sessionList
      if (id !== sessionListTemp[0].sessionId) {
        console.log(id)
        let nowSessionInfo
        for (let i = 0; i < sessionListTemp.length; i++) {
          if (sessionListTemp[i].sessionId == id) {
            nowSessionInfo = sessionListTemp[i]
            sessionListTemp.splice(i, 1)
            break
          }
        }
        sessionListTemp.unshift(nowSessionInfo)
        this.setSessionList(sessionListTemp)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.chatHome {
  /*// margin-top: 20px;*/
  display: flex;
  .chatLeft {
    width: 230px;
    .title {
      color: #fff;
      padding-left: 10px;
    }
    .online-person {
      margin-top: 60px;
      .onlin-text {
        padding-left: 10px;
        color: rgb(176, 178, 189);
      }
      .person-cards-wrapper {
        width: 230px;
        padding-left: 10px;
        height: 69vh;
        margin-top: 15px;
        overflow: hidden;
        overflow-y: scroll;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          width: 0; /* Safari,Chrome 隐藏滚动条 */
          height: 0; /* Safari,Chrome 隐藏滚动条 */
          display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
        }
      }
    }
  }

  .chatRight {
    flex: 1;
    padding-right: 30px;
    .showIcon {
      position: absolute;
      top: calc(50% - 150px); /*垂直居中 */
      left: calc(50% - 50px); /*水平居中 */
      .icon-snapchat {
        width: 300px;
        height: 300px;
        font-size: 300px;
        // color: rgb(28, 30, 44);
      }
    }
  }
}
.addSession {
  margin-left: 20px;
}
.el-button {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 14px;
  border-radius: 10px;
  background-color: rgb(50, 54, 68);
  cursor: pointer;
  color: white;
  border-color: rgb(50, 54, 68);
  &:hover {
    background-color: #1d90f5;
    transition: 0.3s;
    box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
  }
}

.plusIcon{
  margin: 10px 5px;
  width: 50%;
  height: 100%;

}
</style>
