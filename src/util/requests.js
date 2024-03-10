import axios  from "axios";


axios.defaults.withCredentials=true
const instance = axios.create(
    {
        timeout: 50000
    }
)


export default instance