const express = require("express");
const router = express.Router();

const userCtrl = require("../controller/user");
const userValidator = require("../validator/user");
const auth = require("../middleware/auth");
//const noAuth = require("../middleware/no-auth");

//用户登录
router.post("/login", userValidator.login, userCtrl.login);

//用户注册
router.post("/register", userValidator.register, userCtrl.register);

//获取用户信息
router.get("/user", auth, userCtrl.getUser);

// 退出系统
router.post("/logout", userCtrl.logout);

module.exports = router;
