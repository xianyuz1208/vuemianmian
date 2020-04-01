import request from '../uitils/request'
export function subAdd(data) {
  return request({
    url: "/subject/add",
    method: "post",
    data
  });
}
export function subList(params) {
  return request({
    url: "/subject/list",
    method: "get",
    params
  });
}
export function subEdit(data) {
  return request({
    url: "/subject/edit",
    method: "post",
    data
  });
}
export function subStatus(data) {
  return request({
    url: "/subject/status",
    method: "post",
    data
  });
}
export function subRemove(data) {
  return request({
    url: "/subject/remove",
    method: "post",
    data
  });
}
