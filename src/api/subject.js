import axios from "axios";
import { getToken } from "../uitils/token";
const subRequest = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true
});
subRequest.interceptors.request.use(
  function(config) {
    config.headers.token = getToken();
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
subRequest.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    return Promise.reject(error);
  }
);
export function subAdd(data) {
  return subRequest({
    url: "/subject/add",
    method: "post",
    data
  });
}
export function subList(params) {
  return subRequest({
    url: "/subject/list",
    method: "get",
    params
  });
}
export function subEdit(data) {
  return subRequest({
    url: "/subject/edit",
    method: "post",
    data
  });
}
export function subStatus(data) {
  return subRequest({
    url: "/subject/status",
    method: "post",
    data
  });
}
export function subRemove(data) {
  return subRequest({
    url: "/subject/remove",
    method: "post",
    data
  });
}
