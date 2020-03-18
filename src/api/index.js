import axios from 'axios'
import { getToken } from '../uitils/token'
const instance2 = axios.create({
  baseURL:process.env.VUE_APP_URL,
  withCredentials:true
})
export function info(){
 return instance2({
    url:"/info",
    method:'get',
    headers:{
      token: getToken()
    }
  })
}
export function logout(){
 return instance2({
    url:"/logout",
    method:'get',
    headers:{
      token: getToken()
    }
  })
}