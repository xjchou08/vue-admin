//封装请求方法

import service from './service'

   /**
     * methods: 请求方法
     * @param url
     * @param params  
     */
const http = {
  get(url, params) {
    const config = {
      method: "get",
      url: url,
    };
    if (params) config.data = params;
    return service(config);
  },
  put(url, params) {
    const config = {
      method: "put",
      url: url,
    };
    if (params) config.params = params;
    return service(config);
  },
  post(url, params) {
    const config = {
      method: "post",
      url: url,
    };
    if (params) { config.data = params; }
    return service(config);
  },
  delete(url, params) {
    const config = {
      method: "delete",
      url: url,
    };
    if (params) config.params = params;
    return service(config);
  },
};

export default http