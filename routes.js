/*global redisClient */

const express = require('express')
const router = express.Router()
const config = require('./config')
const Base58 = require('./lib/Base58')

// Handle the shorten action
router.post('/api/shorten', (req, res) => {
  const COUNT_URL = 'countUrl'
  let longUrl = req.body.url
  let shortUrl = ''

  // Request the hash by longUrl key
  redisClient.get(longUrl, (err, reply) => {
    if (err) {
      res.status(500).send('Error: unable to request the submitted URL')
      return
    }
    // If the url is already submitted
    if (reply) {
      // Shorten the Url with the url id and send it back to the client
      shortUrl = config.webhost + Base58.encode(reply)
      res.send({
        shortUrl
      })
    } else {
      // Store a new url
      // Begin by incrementing the count key and will use it as the url id
      redisClient.incr(COUNT_URL, (err, replyCount) => {
        if (err) {
          res.status(500).send('Error: something wrong happens when saving a new URL id in the database')
          return
        }
        // Store the hash by the new longUrl key
        redisClient.set(longUrl, replyCount, (err) => {
          if (err) {
            res.status(500).send('Error: something wrong happens when saving a new URL in the database')
            return
          }

          let encodedKey = Base58.encode(replyCount)
          shortUrl = config.webhost + encodedKey

          redisClient.set(encodedKey, longUrl, (err) => {
            if (err) {
              res.status(500).send('Error: something wrong happens when saving the new encoded key in the database')
              return
            }

            res.send({
              shortUrl
            })
          })
        })
      })
    }
  })
})

router.get('/:encoded_id', (req, res) => {
  let base58Id = req.params.encoded_id

  redisClient.get(base58Id, (err, reply) => {
    if (err) {
      res.status(500).send('Error: unable to fetch the requested URL')
      return
    }

    if (reply) {
      // There is match with the short url in our URL collection
      res.redirect(reply)
    } else {
      // Not found, redirect to the homepage
      res.redirect(config.webhost)
    }
  })
})

module.exports = router
