const express = require('express')
const { createWatched } = require('./controller')

const router = express.Router()

router.post('/', createWatched)

module.exports = router
