const { User } = require('../model')
const jwt = require('../utils/jwt')
const { jwtSecret } = require('../config/config.default')

exports.login = async(req, res, next) => {
    try {
      const user = req.user.toJSON()
      if (user) {
        const token = await jwt.sign(
          {
            userId: user._id,
          },
          jwtSecret,
          {
            expiresIn: 60 * 60 * 24, //token有效期24hour
          }
        );
        delete user.password
        res.status(200).json({
          ...user,
          token,
        });
      } else {
        return res.status(400).send('登录失败')
      }
    
    } catch (err) {
        next(err)
    }
}

exports.register = async (req, res, next) => {
    try {
        let user = new User(req.body)
        await user.save()  

        user = user.toJSON()
        delete user.password

        console.log(user)
        res.status(200).send(user)
    } catch (err) {
        next(err)
    }
}

exports.getUser = async (req, res, next) => {
  try {
      res.status(200).json({
        user: req.user,
      });
  } catch (err) {
    next(err);
  }
};