import request from '../uitils/request'
export function enterpriseList(params){
    return request({
      url:'/enterprise/list',
      method:'get',
      params
    })
}
export function enterpriseAdd(data){
    return request({
      url:'/enterprise/add',
      method:'post',
      data
    })
}
//更改状态
export function enterpriseStatus(data){
    return request({
      url:'/enterprise/status',
      method:'post',
      data
    })
}
//删除
export function delEnterprise(data){
    return request({
      url:'/enterprise/remove',
      method:'post',
      data
    })
}
export function editEnterprise(data){
    return request({
      url:'/enterprise/edit',
      method:'post',
      data
    })
}