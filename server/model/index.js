const mongoose = require("mongoose");
const { dbUrl } = require("../config/config.default");

mongoose.connect(dbUrl, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
})

const db = mongoose.connection;

db.on("error", (err) => {
  //监听数据库连接失败
  console.log("数据库连接失误:", err);
});

db.once("open", () => {
  //数据库连接成功
  console.log("数据库连接成功");
});

//创建数据模型
module.exports = {
  User: mongoose.model("User", require("./user")),
};
