//封装axios
import axios from "axios";
import { getToken } from "./auth";
import { message } from "element-ui";

const service = axios.create({
  //baseURL: "http://localhost:3000/api", //vue.config.js  配置跨域的同时要关掉这里的
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

//请求拦截器
service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers["Authorization"] = "Bearer " + getToken();
    }

    //console.log(config);
    return config;
  },
  (error) => {
    error.message = error;
    return Promise.reject(error);
  }
);

//响应拦截器
service.interceptors.response.use(
  (response) => {
    //console.log(response);

    let data;
    if (response.data === undefined) {
      data = response.request.responseText;
    } else {
      data = response.data;
    }

    console.log(data);
    return response;
  },
  (err) => {
    console.log("接受到结果");
    //console.log(err.response);
    if (err && err.response) {
      console.log(err.response.status);
      switch (err.response.status) {
        case 400:
          err.message = "请求错误";
          break;
        case 401:
          err.message = "未授权，请登录";
          break;
        case 403:
          err.message = "拒绝访问";
          break;
        case 404:
          err.message = "请求地址错误";
          break;
        case 408:
          err.message = "请求超时";
          break;
        case 500:
          err.message = "服务器内部错误";
          break;
        case 501:
          err.message = "服务未实现";
          break;
        case 502:
          err.message = "网关错误";
          break;
        case 503:
          err.message = "服务不可用";
          break;
        case 504:
          err.message = "网关超时";
          break;
        case 505:
          err.message = "http版本不受支持";
          break;
        default:
      }
    }
    message.error({
      message: err.message,
    });
    return Promise.reject(err);
  }
);

export default service;
