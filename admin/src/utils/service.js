//封装axios
import axios from "axios";
import { getToken } from "./auth";
import { message, MessageBox } from "element-ui";

const service = axios.create({
  //baseURL: "http://localhost:3000/api", //vue.config.js  配置跨域的同时要关掉这里的
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000,
});

//请求拦截器
service.interceptors.request.use(
  (config) => {
    (config.headers.get["Content-Type"] = "application/json;charset=utf-8"),
      (config.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded");

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
    //// 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;

    if (response.status === 401) {
      MessageBox.confirm("登录信息过期，请重新登录", "确认退出", {
        confirmButtonText: "重新登录",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("user/resetToken").then(() => {
          location.reload();
          this.$router.push("login");
        });
      });
    }
    return response;
  },
  (err) => {
    //console.log(err.response.status);
    //console.log(err.response.data.errors[0].msg); //错误信息

    message({
      message: err.response.data.errors[0].msg,
      type: "error",
    });

    return Promise.reject(err);
  }
);

export default service;
