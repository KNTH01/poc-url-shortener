'use strict'

module.exports = {
  // the URL shortening host - shortened URLs will be this + base58 ID (ex: http://localhost:3000/3Ys)
  webhost: 'http://localhost:3000/',
  server: {
    host: 'localhost',
    port: 3000
  },
  database: {
    dbname: 'poc_url_shortener',
    username: 'root',
    password: 'root'
  }
}
