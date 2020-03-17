const TOKENKEY = "hmtoken"
export function setToken(token){
  window.localStorage.setItem(TOKENKEY,token)
}
export function getToken(){
  return window.localStorage.getItem(TOKENKEY)
}
export function remToken(){
  window.localStorage.removeItem(TOKENKEY)
}