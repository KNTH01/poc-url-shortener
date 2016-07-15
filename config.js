'use strict'

module.exports = {
  // the URL shortening host - shortened URLs will be this + base58 ID (ex: http://localhost:3000/3Ys)
  webhost: 'http://localhost:3000/',
  db: {
    // MongoDB conf
    host: 'localhost',
    name: 'url_shortener'
  }
}
