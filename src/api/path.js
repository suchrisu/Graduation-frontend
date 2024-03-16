export default {
  baseUrl: 'http://localhost',
  login: '/login/login',
  loginCode: '/login/loginCode',
  register: '/register/register',
  sendRegisterCode: '/register/sendRegisterCode',

  addSession: '/session/addSession',
  removeSession: '/session/removeSession',
  setSessionName: 'session/setSessionName',
  setSessionTime: 'session/setSessionTime',
  getSessions: 'session/getSessions',

  chatWithLLM: 'chat/chatWithLLM',
  getChatMessageList: '/chat/getChatMessageList',

  updateUser: 'user/updateUser',
  updateUserPassword: 'user/updateUserPassword',
  sendvalidCode: 'user/sendValidCode',
  logOut: 'login/logOut'
}
