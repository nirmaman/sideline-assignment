const query = require('../../sql/queries/watched')
const dbHelper = require('../../utils/dbHelper')
const Logger = require('logplease')
const logger = Logger.create('watched.service.js')

const createWatched = async (payload, result) => {
  try {
    const res = await dbHelper.update(query.createWatched(payload), payload)
    if (!res.insertId && !res.affectedRows) {
      console.log(res)
      return result.status(404).end()
    }
    return result.status(201).end()
  } catch (error) {
    logger.error(error)
    return result.status(400).end()
  }
}

module.exports = {
  createWatched,
}
