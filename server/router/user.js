const express = require("express");
const userCtrl = require("../controller/user");

const router = express.Router();

//用户登录
router.post('/login', userCtrl.login);

//获取用户信息
router.get('/user', userCtrl.getUser)

module.exports = router;
