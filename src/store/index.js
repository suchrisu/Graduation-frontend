import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessionList:[]
  },
  getters: {
  },
  mutations: {

    setSessionList(state,value){
      state.sessionList = value
    },
    removeSessionFromList(state,sessionId){
      console.log("sessionList")
      console.log(state.sessionList)
      console.log(sessionId)
      let index = state.sessionList.findIndex(session=>{
        console.log(session)
        return session.sessionId == sessionId
      })
      console.log(index)
      
      state.sessionList.splice(index,1)
    }

  },
  actions: {
  },
  modules: {
  }
})
