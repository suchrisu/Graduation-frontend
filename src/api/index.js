
import axios from '../util/requests'
import path from './path'
import {ElMessage} from 'element-plus'
export default {
  getBaseUrl() {
    return axios.get(path.baseUrl)
  },
  login(code, user) {
    return axios.post(path.login + '?code=' + code, user)
  },
  register(code, user) {
    return axios.post(path.register + '?code=' + code, user)
  },
  sendRegisterCode(mail) {
    return axios.get(path.sendRegisterCode + '?mail=' + mail)
  },

  addSession(session) {
    return axios.post(path.addSession, session)
  },
  removeSession(sessionId) {
    return axios.get(path.removeSession + '?sessionId=' + sessionId)
  },
  setSessionName(session) {
    return axios.post(path.setSessionName, session)
  },
  setSessionTime(session) {
    return axios.post(path.setSessionTime, session)
  },
  getSessions() {
    return axios.get(path.getSessions)
  },

  createSseConnect(clientId){
    return path.baseUrl+path.createSseConnect+"?clientId="+clientId;
  },
  closeSseConnect(clientId){
    return axios.get(path.closeSseConnect+"?clientId="+clientId);
  },
  chatWithLLM(sessionFile, chatMessage) {
    return axios.post(
      path.chatWithLLM + '?sessionFile=' + sessionFile,
      chatMessage
    )
  },

  eval(sessionFile,id,like){
    return axios.get(path.eval+"?sessionFile="+sessionFile+"&id="+id+"&like="+like)
  },

  getChatMessageList(sessionFile) {
    return axios.get(path.getChatMessageList + '?sessionFile=' + sessionFile)
  },



  updateUser(user){
    return axios.post(path.updateUser,user);
  },
  sendValidCode(mail){
    return axios.get(path.sendvalidCode+"?mail="+mail);
  },
  updateUserPassword(code,user){
    return axios.post(path.updateUserPassword+"?code="+code,user);
  },

  getHeader(userHeader){
    //  return axios.request({
    //   url: path.getHeader+"?userHeader="+userHeader,
    //   methods: "get",
    //   responseType: 'blob'
    //  }).then(res=>{
    //   const headers = res;
    //   console.log(headers)
    //   const blob = new Blob([res],{type: headers['content-type']})
    //   console.log(blob)
    //   const url = URL.createObjectURL(blob);
    //   console.log(url);
    //   return url;
    //  }).catch(err=>{
    //   ElMessage.error(err.message)
    //  })
     const url = path.baseUrl+path.getHeader+"?userHeader="+userHeader;
     return url;
  },

  uploadHeader(){
    return path.baseUrl+"/"+path.uploadHeader;
  },


  logOut(){
    return axios.get(path.logOut);
  }
}
