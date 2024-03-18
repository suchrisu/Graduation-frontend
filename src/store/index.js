import { createStore } from 'vuex'
import {sessionStorageGet,sessionStorageSet,deepClone} from '@/util/util'
export default createStore({
  state: {
    sessionList: [],
    userHeader: '',
    currentUser: sessionStorageGet('currentUser')
  },
  getters: {},
  mutations: {
    setSessionList(state, value) {
      state.sessionList = deepClone(value);
    },
    removeSessionFromList(state, sessionId) {
      let index = state.sessionList.findIndex((session) => {
        console.log(session)
        return session.sessionId == sessionId
      })
      let sessionListTemp = state.sessionList;
      sessionListTemp.splice(index, 1)
      state.sessionList = deepClone(sessionListTemp)
    },
    setUserHeader(state,userHeader){
      state.userHeader = userHeader;
    },
    setCurrentUser(state,currentUser){
      state.currentUser = deepClone(currentUser);
      sessionStorageSet('currentUser',currentUser);
    }
  },
  actions: {},
  modules: {},
})
