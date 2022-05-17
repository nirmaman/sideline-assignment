const service = require('./service')
const Logger = require('logplease')
const logger = Logger.create('watched.controller.js')

const createWatched = async (req, res) => {
  try {
    const bodyParameters = await process_payload(req.body)
    if (!bodyParameters.baseCurrency || !bodyParameters.exchangedCurrency || !bodyParameters.threshold) {
      return res.status(400).end()
    }
    service.createWatched(bodyParameters, res)
  } catch (error) {
    logger.error(error)
    return res.status(400).end()
  }
}

module.exports = {
  createWatched,
}
const process_payload = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const processed_payload = {}
      for (const [key, val] of Object.entries(payload)) {
        if (val !== undefined) {
          switch (key) {
            case 'baseCurrency':
              processed_payload.baseCurrency = val.trim().toUpperCase()
              break
            case 'exchangedCurrency':
              processed_payload.exchangedCurrency = val.trim().toUpperCase()
              break
            case 'threshold':
              if (typeof val !== 'number') {
                return reject({ status: 400, message: 'threshold must be a number' })
              }
              processed_payload.threshold = val
              break
            default:
              return reject({ status: 400 })
          }
        }
      }
      return resolve(processed_payload)
    } catch (error) {
      logger.error(`Failed to process watched payload, The error: ${error}`)
      return reject({ status: 404 })
    }
  })
}
