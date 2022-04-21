'use strict'

const path = require('path');

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}


module.exports = {
  devServer: {
    proxy: {
      "/api": {
        host: "0.0.0.0", // 允许外部ip访问
        target: "http://localhost:3000/api", //提供服务的接口
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
    disableHostCheck: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"), //src 别名
      },
    },
  },

};