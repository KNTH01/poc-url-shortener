const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config')
const Base58 = require('./lib/Base58')
const Url = require('./models/Url')

const app = express()

// Connect to mongodb
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name)

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

// Handle the shorten action
app.post('/api/shorten', (req, res) => {
  let longUrl = req.body.url
  let shortUrl = ''

  // Check if url already exists in database
  Url.findOne({
    long_url: longUrl
  }, (err, doc) => {
    if (err) {
      res.status(500).send('Error: something wrong happens when requesting for the URL')
      return
    }
    if (doc) {
      // Build the short url by encoding with Base58 the id
      shortUrl = config.webhost + Base58.encode(doc._id)

      res.send({
        'shortUrl': shortUrl
      })
    } else {
      let newUrl = Url({
        long_url: longUrl
      })

      // Create a new entry in our URL collection
      newUrl.save((err) => {
        if (err) {
          res.status(500).send('Error: unable to save the new URL')
          return
        }
        // Build the short url by encoding with Base58 the id
        shortUrl = config.webhost + Base58.encode(newUrl._id)

        res.send({
          'shortUrl': shortUrl
        })
      })
    }
  })
})

app.get('/:encoded_id', (req, res) => {
  let base58Id = req.params.encoded_id
  let id = Base58.decode(base58Id)

  // Check if the url already exists in database
  Url.findOne({
    _id: id
  }, (err, doc) => {
    if (err) {
      res.status(500).send('Error: unable to fetch the requested URL')
      return
    }
    if (doc) {
      // There is match with the short url in our URL collection
      res.redirect(doc.long_url)
    } else {
      // Not found, redirect to the homepage
      res.redirect(config.webhost)
    }
  })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
