export default {
  baseUrl: 'http://localhost',
  login: '/login/login',
  loginCode: '/login/loginCode',
  register: '/register/register',
  sendRegisterCode: '/register/sendRegisterCode',

  addSession: '/session/addSession',
  removeSession: '/session/removeSession',
  setSessionName: '/session/setSessionName',
  setSessionTime: '/session/setSessionTime',
  getSessions: '/session/getSessions',

  
  createSseConnect: '/chat/createSseConnect',
  closeSseConnect: '/chat/closeSseConnect',
  chatWithLLM: '/chat/chatWithLLM',
  getChatMessageList: '/chat/getChatMessageList',
  eval: '/chat/eval',

  updateUser: '/user/updateUser',
  updateUserPassword: '/user/updateUserPassword',
  sendvalidCode: '/user/sendValidCode',
  getHeader: '/userFile/getHeader',
  uploadHeader: '/userFile/uploadHeader',
  logOut: '/login/logOut'
}
