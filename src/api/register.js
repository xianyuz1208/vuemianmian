import axios from 'axios'
export function sendSms(data){
   return axios({
       url:process.env.VUE_APP_URL + "/sendsms",
       method:'post',
       data,
       withCredentials:true
    })
}
export function upRegister(data){
    return axios({
        url:process.env.VUE_APP_URL + '/register',
        method:'post',
        withCredentials:true,
        data
    })
}