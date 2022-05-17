const getWatched = () => {
  return `select * from WatchedCurrency;`
}
const createAlert = (details) => {
  return `
  INSERT INTO Alert (${Object.keys(details)})
  VALUES (${Object.values(details).map((u) => '?')});`
}

module.exports = {
  getWatched,
  createAlert,
}
