const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const redis = require('redis')

const config = require('./config')

// Create Sequelize connection with default options
const sequelize = new Sequelize(config.database.dbname, config.database.username, config.database.password)

// Create Redis connection
const redisClient = redis.createClient()

// Store this as global in order to use it in routes.js
global.redisClient = redisClient

const routes = require('./routes')
const app = express()

// Config bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Serve file from our public folder
app.use(express.static(path.join(__dirname, 'public')))

// Serve the homepage index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'))
})

app.use('/', routes)

// Wait for connection to our Databases (Redis and MySQL) before launching the server

redisClient.on('connect', (err) => {
  if (err) {
    console.error('Unable to connect to the Redis server', err)
    throw err
  }
  console.log('Connection to Redis has been established successfully.')
  sequelize
    .authenticate()
    .then((err) => {
      if (err) {
        console.error(err)
      }
      console.log('Connection to MySQL has been established successfully.')
      app.listen(config.server.port, () => {
        console.log(`Serveur is up to address: http://${config.server.host}:${config.server.port}/`)
      })
    })
    .catch((err) => {
      if (err) {
        console.log('Unable to connect to the database:', err)
        throw err
      }
    })
})

// const Url = sequelize.define('url', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   longUrl: {
//     type: Sequelize.STRING,
//     field: 'long_url'
//   },
//   shortUrl: {
//     type: Sequelize.STRING,
//     field: 'short_url'
//   }
// })
//
// Url.sync({
//   // force: true
// }).then(() => {
//   // Table created
//   return Url.create({
//     longUrl: 'Ok',
//     shortUrl: 'K'
//   })
// })
