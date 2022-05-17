const getWatched = () => {
  return `select * from watched-currency;`
}
const createWatched = (details) => {
  return `
  INSERT INTO WatchedCurrency (${Object.keys(details)})
  VALUES (${Object.values(details).map((u) => '?')});`
}

module.exports = {
  getWatched,
  createWatched,
}
