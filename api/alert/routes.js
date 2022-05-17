const express = require('express')
const { getAlerts } = require('./controller')

const router = express.Router()

router.get('/', getAlerts)

module.exports = router
