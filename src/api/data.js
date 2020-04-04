import request from '../uitils/request'
export function getTitle(){
    return request({
      url:"/data/title",
      method:"post",
    })
}
export function getStatistics(){
    return request({
      url:"/data/statistics",
      method:"post",
    })
}