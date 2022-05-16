const { User } = require("../model");
const jwt = require("../utils/jwt");
const { jwtSecret } = require("../config/config.default");

exports.login = async (req, res, next) => {
  try {
    const user = req.user.toJSON();

    if (user) {
      const token = await jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: 7 * 60 * 60 * 24, // token有效期1天
      });

      const refresh_token = await jwt.sign(
        {
          userId: user._id,
        },
        jwtSecret,
        {
          expiresIn: 7 * 60 * 60 * 24, // token有效期一周
        }
      );

      req.session.token = token;
      req.session.user = user;

      return res.status(200).json({
        code: 200,
        message: "登录成功",
        username: user.username,
        avaster: user.image,
        token,
        refresh_token,
      });
    }
    if (res.status === 400) {
      return res.send({
        code: 400,
        message: "登录失败",
      });
    } else if (res.status === 401) {
      return res.send({
        code: 401,
        message: "登录信息过期，请重新登录",
      });
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    let user = new User(req.body);
    await user.save();

    res.status(200).json({
      code: 2000,
      message: "账号注册成功",
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = req.session.user;

    //console.log(req.headers.authorization);

    if (user) {
      return res.status(200).json({
        code: 2000,
        message: "获取用户信息成功",
        username: user.username,
        image: user.image,
      });
    }
    return res.status(500).json({
      message: "服务器问题",
      code: 500,
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    // 清除用户登录状态
    // 跳转到登录页面

    req.session.user = null;
    req.headers.cookie = null;

    res.status(200).send("退出系统");
  } catch (err) {
    next(err);
  }
};
