const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const redis = require('redis')
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

// Wait for connection to Redis server before launching the server
redisClient.on('connect', () => {
  app.listen(3000, () => {
    console.log('Server listening on port 3000')
  })
})
