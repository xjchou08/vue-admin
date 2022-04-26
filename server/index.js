const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const router = require("./router/index");
const session = require("express-session");
const errorhandler = require("errorhandler");
const { sessionSecret } = require("./config/config.default");
require("./model");

const port = process.env.port || 3000;

// 跨域
app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(cookie());
app.use("/api", router);

/**
 *
 * session
 */
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60, // 过期时间 60秒
      //secure: true //https 才会
      // secure: true,
      httpOnly: true,
      //domain: 'example.com',
      //path: 'foo/bar',
      expires: "",
    },
  })
);

if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorhandler());
}

app.listen(port, () => {
  console.log(`服务器启动：localhost:${port}/`);
});
