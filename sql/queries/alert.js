const getAlerts = () => {
  return `select * from Alert;`
}
const create_alert = (details) => {
  return `
  INSERT INTO Alert (${Object.keys(details)})
  VALUES (${Object.values(details).map((u) => '?')});`
}

module.exports = {
  getAlerts,
  create_alert,
}
