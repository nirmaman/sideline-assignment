const service = require('./service')
const Logger = require('logplease')
const logger = Logger.create('alert.controller.js')
const getAlerts = async (req, res) => {
  try {
    service.getAlerts({}, res)
  } catch (error) {
    return res.status(400).end()
  }
}

module.exports = {
  getAlerts,
}
