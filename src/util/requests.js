import axios from 'axios'
import path from '@/api/path'
import { sessionStorageGet } from '@/util/util'
import {ElMessage} from 'element-plus'
import { proxyRefs } from 'vue'
axios.defaults.withCredentials = true
const instance = axios.create({ baseURL: path.baseUrl, timeout: 50000 })

instance.interceptors.request.use(config=>{
    const token = sessionStorageGet("token")
    if(token){
        config.headers.token = token;
    }
    return config;
},err=>{
    return Promise.reject(err)
})

instance.interceptors.response.use(res=>{
    // console.log(res)
    if(res.headers['content-type'].includes("application/json")){
        if(res.data.code==1){
            return res;
        }
        
        // ElMessage.error(res.data.message)
        return Promise.reject(new Error(res.data.message))
    }
    return res;
    
}
,
err=>{
    return Promise.reject(new Error(err.message))
}
)
export default instance
