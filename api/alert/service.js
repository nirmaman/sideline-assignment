const query = require('../../sql/queries/alert')
const dbHelper = require('../../utils/dbHelper')
const Logger = require('logplease')
const logger = Logger.create('alert.service.js')
const getAlerts = async (payload, result) => {
  try {
    const data = await dbHelper.get(query.getAlerts(payload))
    return result.send(data)
  } catch (error) {
    logger.error(error)
    return result.status(500).end()
  }
}

module.exports = {
  getAlerts,
}
