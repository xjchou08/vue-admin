//用户模型
const mongoose = require("mongoose");
const baseModel = require("./base-model");
const md5 = require('../utils/md5')

const userSchema = new mongoose.Schema({
  ...baseModel,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
    set:(value) => md5(value),
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
});

module.exports = userSchema;
