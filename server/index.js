const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const router = require("./router/index");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const { dbUrl } = require("./config/config.default");
const { sessionSecret } = require("./config/config.default");
const errorhandler = require("errorhandler");
require("./model");

const port = process.env.port || 3000;

app.use(morgan("dev")); //http请求日志
app.use(cors()); // 处理跨域请求

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: sessionSecret,
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //一天
    },
    store: MongoStore.create({
      mongoUrl: dbUrl,
      ttl: 24 * 60 * 60, // = 1 days. Default
    }),
  })
);

if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorhandler());
}

app.use("/api", router);

app.listen(port, () => {
  console.log(`服务器启动：localhost:${port}/`);
});
