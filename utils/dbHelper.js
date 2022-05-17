const sql = require('./db')

// get data from database
const get = (sql_query) => {
  return new Promise((resolve, reject) => {
    sql.query(`${sql_query}`, (err, res) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

// update in database
const update = (query, data) => {
  return new Promise((resolve, reject) => {
    try {
      sql.query(`${query}`, Object.values(data), (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      })
    } catch (error) {
      return reject(error)
    }
  })
}

module.exports = {
  get,
  update,

}