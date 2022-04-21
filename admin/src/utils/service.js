//封装axios
import axios from 'axios'
import { getToken } from './auth';

const service = axios.create({
  //baseURL: "http://localhost:3000/api", //vue.config.js  配置跨域的同时要关掉这里的
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});


//请求拦截器   
service.interceptors.request.use(config => {

  config.headers.get['Content-Type'] = "application/json;charset=utf-8",
  config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  
  //const token = store.getters.token
  
  if (getToken()) {
    config.headers["Authorization"] = "Bearer " + getToken();
  }

    
  return config
  
}, error => {
  error.message = error
  return Promise.reject(error)
});

//响应拦截器
service.interceptors.response.use(response => {  
  //const code = response
  //console.log(response.data.code)
  
  
  return response
  //console.log(response.status);

}, err => {
      return err
});

export default service;