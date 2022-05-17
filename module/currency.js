const query = require('../sql/queries/currency')
const dbHelper = require('../utils/dbHelper')
const Logger = require('logplease')
const logger = Logger.create('module/currency.js')
const axios = require('axios')

const getCurrencies = async () => {
  try {
    const WatchedCurrencies = await dbHelper.get(query.getWatched())
    if (!WatchedCurrencies.length) {
      logger.warn(`didn't find Watched Currencies`)
      return
    }
    const currencyExchangeURL = process.env.CURRENCY_EXCHANGE_URL
    const currencyExchangeAPIKey = process.env.CURRENCY_EXCHANGE_API_KEY
    for (const WatchedCurrency of WatchedCurrencies) {
      const { baseCurrency, exchangedCurrency, threshold } = WatchedCurrency
      const fullURL = `${currencyExchangeURL}${currencyExchangeAPIKey}&from=${baseCurrency}&to=${exchangedCurrency}&amount=1`
      const ExchangeCurrencies = await axios.get(fullURL).catch((error) => logger.error(error))
      // if (!ExchangeCurrencies || !ExchangeCurrencies.data || !ExchangeCurrencies.data.amount) {
      //   logger.warn(`didn't find Exchange Currency ${baseCurrency} to ${exchangedCurrency}`)
      //   continue
      // }
      let exchangeAmount = ExchangeCurrencies.data.amount
      if (exchangeAmount === 0) {
        exchangeAmount = 3
      }
      if (exchangeAmount > Number(threshold)) {
        const alertData = { timestamp: new Date(), baseCurrency, exchangedCurrency, ValueToDate: exchangeAmount }
        const resAlert = await dbHelper.update(query.createAlert(alertData), alertData)
        if (!resAlert.affectedRows) {
          logger.error(`Failed to create an alert in the db, alert: ${alertData}`)
        }
        console.log(resAlert)
      }
    }
  } catch (error) {
    logger.error(error)
  }
}

module.exports = {
  getCurrencies,
}
