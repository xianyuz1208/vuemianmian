import axios from "axios";
import { getToken } from "../uitils/token";
const request = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true
});
request.interceptors.request.use(
  function(config) {
    config.headers.token = getToken();
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    return Promise.reject(error);
  }
);
export default request