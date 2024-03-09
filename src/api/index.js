import axios from "../utils/requests";
import {path} from "./path"
export const api = {
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
