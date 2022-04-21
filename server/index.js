const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router/index')
const errorhandler = require("errorhandler");
require('./model')


const port = process.env.port || 3000

// 跨域
app.use(morgan('dev'))
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(cookie());
app.use('/api', router)


if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorhandler());
}


app.listen(port, () => {
    console.log(`服务器启动：localhost:${port}/`)
})