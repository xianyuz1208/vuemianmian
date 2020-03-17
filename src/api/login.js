import axios from 'axios'
const instance = axios.create({
  baseURL:process.env.VUE_APP_URL,
  withCredentials:true
})
export function login(data){
 return instance({
    url:"/login",
    method:'post',
    data
  })
}