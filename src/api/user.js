import request from '../uitils/request'
export function userList(params){
    return request({
      url:'/user/list',
      method:'get',
      params
    })
}
export function userAdd(data){
    return request({
      url:'/user/add',
      method:'post',
      data
    })
}
//更改状态
export function userStatus(data){
    return request({
      url:'/user/status',
      method:'post',
      data
    })
}
//删除
export function delUser(data){
    return request({
      url:'/user/remove',
      method:'post',
      data
    })
}
export function editUser(data){
    return request({
      url:'/user/edit',
      method:'post',
      data
    })
}