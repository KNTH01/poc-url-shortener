/*global sequelize */

const Sequelize = require('sequelize')

const Url = sequelize.define('url', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  longUrl: {
    type: Sequelize.STRING,
    field: 'long_url'
  },
  shortenKey: {
    type: Sequelize.STRING,
    field: 'shorten_key'
  }
})

Url.sync({
  // force: true
}).then(() => {
  // Table created
  console.log('Url model is synced')
})

module.exports = Url
