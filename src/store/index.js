import { createStore } from 'vuex'
import {sessionStorageGet,sessionStorageSet,sessionStorageRemove} from '@/util/util'
export default createStore({
  state: {
    sessionList: [],
    userHeader: '',
    currentUser: {}
  },
  getters: {},
  mutations: {
    setSessionList(state, value) {
      state.sessionList = value
    },
    removeSessionFromList(state, sessionId) {
      let index = state.sessionList.findIndex((session) => {
        console.log(session)
        return session.sessionId == sessionId
      })
      console.log(index)

      state.sessionList.splice(index, 1)
    },
    setUserHeader(state,userHeader){
      state.userHeader = userHeader;
    },
    setCurrentUser(state,currentUser){
      state.currentUser = currentUser;
      sessionStorageSet(currentUser);
    }
  },
  actions: {},
  modules: {},
})
