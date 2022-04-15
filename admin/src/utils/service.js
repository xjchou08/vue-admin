//封装axios
import axios from 'axios'
import store from '@/store'
// import { getToken } from './auth';
//import { Message } from 'element-ui';

const service = axios.create({
  //baseURL: "http://localhost:3000/api", //vue.config.js  配置跨域的同时要关掉这里的
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});


//请求拦截器   
service.interceptors.request.use(config => {

  config.headers.get['Content-Type'] = "application/json;charset=utf-8",
  config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  
  /**
   * 
  
  const token = getToken()

  if(token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  const res = store.getters.token
 */
  const token = store.getters.token
  
  if (token) {
    config.headers["Authorization"] = "Bearer " + token
  }
  //console.log(token);
    
  return config
  
}, error => {
  error.message = error
  return Promise.reject(error)
});

//响应拦截器
service.interceptors.response.use(response => {
      return Promise.resolve(response)

}, err => {
      switch (err.code) {
        case 200:
          err.message = "错误响应也会有状态码为200的情况";
          break;
        case 400:
          err.message = "请求错误(400)";
          break;
        case 401:
          err.message = "未授权，请重新登录(401)";
          break;
        case 403:
          err.message = "拒绝访问(403)";
          break;
        case 404:
          err.message = "请求出错(404)";
          break;
        case 408:
          err.message = "请求超时(408)";
          break;
        case 500:
          err.message = "服务器错误(500)";
          break;
        case 501:
          err.message = "服务未实现(501)";
          break;
        case 502:
          err.message = "网络错误(502)";
          break;
        case 503:
          err.message = "服务不可用(503)";
          break;
        case 504:
          err.message = "网络超时(504)";
          break;
        case 505:
          err.message = "HTTP版本不受支持(505)";
          break;
        default:
          err.message = `连接出错，状态码：(${err.status})!`;
      }
      return err
});

export default service;