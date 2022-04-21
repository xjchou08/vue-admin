//关于用户的验证
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { User } = require("../model");
const md5 = require('../utils/md5')

exports.register = validate([
  body("username")
    .notEmpty()
    .withMessage("用户名不能为空")
    .custom(async (username) => {
      const user = await User.findOne({ username });

      if (user) {
        return Promise.reject("用户名已存在");
      }
    }),
  body("email")
    .notEmpty()
    .withMessage("邮箱不能为空")
    .isEmail()
    .withMessage("邮箱格式不正确")
    .bail()
    .custom(async (email) => {
      const user = await User.findOne({ email });

      if (user) {
        return Promise.reject("邮箱已存在");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("密码不能为空")
    .isLength(6, 12)
    .withMessage("密码长度6-12"),
]);

exports.login = [
  validate([
    body("email")
      .notEmpty()
      .withMessage("邮箱不能为空")
      .isEmail()
      .withMessage("邮箱格式错误"),
    body("password").notEmpty().withMessage("密码不能为空"),
  ]),
  validate([
    //上面验证成功，检验是否存在此用户
    body("email").custom(async (email, { req }) => {
      const user = await User.findOne({ email }).select([
        "username",
        "email",
        "image",
        "password",
      ]);

      if (!user) {
        return Promise.reject("该用户不存在");
      }

      req.user = user;
    }),
  ]),

  validate([
    //验证密码是否与数据库存储的相同
    body("password").custom(async (password, { req }) => {
      //console.log(req.user.password);
      //console.log(md5(password));
      if (md5(password) !== req.user.password) {
        return Promise.reject("密码不正确");
      }
    }),
  ]),
];
