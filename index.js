const express = require('express')
const cors = require('cors')
const path = require('path')
const server = express()
server.use(express.json())
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const Logger = require('logplease')
const logger = Logger.create('./index.js')

server.use(cors('*'))
const alertRoutes = require('./api/alert/routes')
const watchedRoutes = require('./api/watched/routes')

// Routes
server.use('/alert', alertRoutes)
server.use('/watched', watchedRoutes)

const currency = require('./module/currency')

// setInterval(() => {
//currency.getCurrencies()
// }, 3000)

const port = process.env.HTTP_PORT || 3001
server.listen(port, () => {
  logger.info(`HTTP Server is running on: ${port}`)
})

