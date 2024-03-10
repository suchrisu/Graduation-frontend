import axios from "../util/requests";
import path from "./path"
export default {
    getBaseUrl(){
        return axios.get(path.baseUrl)
    },
    login(code,user){
        return axios.post(path.baseUrl+path.login+"?code="+code,user)
    },
    register(code,user){
        return axios.post(path.baseUrl+path.register+"?code="+code,user)
    },
    sendRegisterCode(mail){
        return axios.get(path.baseUrl+path.sendRegisterCode+"?mail="+mail)
    }

}
