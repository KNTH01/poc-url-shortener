/*global sequelize */

const Sequelize = require('sequelize')

/**
 * Define the Url model that map with the urls table
 * 3 fields:
 * - id: the autoIncrement id
 * - longUrl: the url to be shorten
 * - shortenKey: the key results by the encode in Base58 of the id
 */
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
}).sync()

module.exports = Url
