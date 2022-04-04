const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router/index')
const errorHandler = require('./middleware/error-handler')


const port = process.env.port || 3000

app.use(morgan('dev'))
app.use(cors())

app.use(express.json());

app.use(router)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`服务器启动：localhost:${port}/`)
})