export default {
  baseUrl: 'http://localhost',
  login: '/user/login',
  loginCode: '/user/loginCode',
  register: '/user/register',
  sendRegisterCode: '/user/sendRegisterCode',

  addSession: '/session/addSession',
  removeSession: '/session/removeSession',
  setSessionName: 'session/setSessionName',
  setSessionTime: 'session/setSessionTime',
  getSessions: 'session/getSessions',

  chatWithLLM: 'chat/chatWithLLM',
  getChatMessageList: '/chat/getChatMessageList',
}
