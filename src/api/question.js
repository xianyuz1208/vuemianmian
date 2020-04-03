import request from '../uitils/request'
export function questionAdd(data) {
  return request({
    url: "/question/add",
    method: "post",
    data
  });
}
export function questionList(params) {
  return request({
    url: "/question/list",
    method: "get",
    params
  });
}
//获取单个题目详细信息接口
export function getQuestion(data) {
  return request({
    url: "/question/one",
    method: "post",
    data
  });
}
//修改状态
export function changeStatus(data) {
  return request({
    url: "/question/status",
    method: "post",
    data
  });
}
//删除
export function delQuestion(data) {
  return request({
    url: "/question/remove",
    method: "post",
    data
  });
}
//编辑
export function editQuestion(data) {
  return request({
    url: "/question/edit",
    method: "post",
    data
  });
}
//上传
export function upload(data) {
  return request({
    url: "/question/upload",
    method: "post",
    data
  });
}