/**
 * session会话
 */
module.exports = async (req, res, next) => {
  const sessionUser = req.session.user;

  if (!sessionUser) {
    // 302 重定向到登录页面
    // res.redirect(307, "/user/login");
    res.status(302).json({
      message: "请先登录",
      code: 302,
    });
  }
  return next();
};
/**
 * 
 *  jwt
 * 
 * 
const { verify } = require("../utils/jwt");
const { jwtSecret } = require("../config/config.default");
const { User } = require("../model");

//验证用户身份、
module.exports = async (req, res, next) => {
  let token = req.headers["Authorization"];
  token = token ? token.split("Bearer ")[1] : null;

  console.log(req.headers);
  if (!token) {
    return res.status(401).end();
  }

  try {
    const decodeToken = await verify(token, jwtSecret);
    req.user = await User.findById(decodeToken.userId);

    // console.log(req.user);
    next();
  } catch (err) {
    res.status(401).end();
  }
};
 */
