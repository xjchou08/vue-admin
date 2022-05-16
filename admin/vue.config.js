const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
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
      "/covid": {
        host: "0.0.0.0",
        target: "https://view.inews.qq.com",
        changeOrigin: true,
        pathRewrite: {
          "^/covid": "",
        },
      },
    },
    disableHostCheck: true,
  },
  chainWebpack: (config) => {
    //set第一个参数：设置的别名，第二个参数：设置的路径
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("components", resolve("./src/components"))
      .set("views", resolve("./src/views"))
      .set("assets", resolve("./src/assets"));
  },
};
