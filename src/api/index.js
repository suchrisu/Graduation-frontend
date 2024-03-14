import axios from '../util/requests'
import path from './path'
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
  chatWithLLM(sessionFile, chatMessage) {
    return axios.post(
      path.chatWithLLM + '?sessionFile=' + sessionFile,
      chatMessage
    )
  },
  getChatMessageList(sessionFile) {
    return axios.get(path.getChatMessageList + '?sessionFile=' + sessionFile)
  },
}
