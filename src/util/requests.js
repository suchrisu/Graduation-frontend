import axios from 'axios'
import path from '@/api/path'
import { sessionStorageGet } from '@/util/util'
axios.defaults.withCredentials = true
const instance = axios.create({ baseURL: path.baseUrl, timeout: 50000 })

// instance.interceptors.request(config=>{
//     if(sessionStorageGet("currentUser")==""){

//     }
// })

// instance.interceptors.response.use(res=>{

// })
export default instance
