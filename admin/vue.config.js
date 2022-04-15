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
        port: 81, // 端口
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
  chainWebpack(config) {
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test
    // set svg-sprite-loader
    //图片精灵
    config.module.rule("svg").exclude.add(resolve("src/assets/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end();
  },
};