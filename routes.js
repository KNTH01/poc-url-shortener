/*global redisClient */

const express = require('express')
const router = express.Router()
const config = require('./config')
const Base58 = require('./lib/Base58')
const Url = require('./models/Url')

// Shorten the url
router.post('/api/shorten', (req, res) => {
  let longUrl = req.body.url
  let shortUrl = ''

  // Find a longUrl
  Url.findOne({
    where: {
      longUrl
    }
  }).then(url => {
    if (url) {
      // The url has already been registered
      shortUrl = config.webhost + url.get('shortenKey')
      return res.send({
        shortUrl
      })
    } else {
      // Create a new URL and store the new longUrl
      Url.create({
        longUrl
      }).then(newUrl => {
        // Shorten the url with its new id and update it
        let shortenKey = Base58.encode(newUrl.get('id'))
        newUrl.update({
          shortenKey
        }).then(newUrl => {
          // Store the shortenKey into Redis in order to instant fetch the long url when requested
          redisClient.set(shortenKey, longUrl, (err) => {
            if (err) {
              return res.status(500).send('Error: something wrong happens when saving the new encoded key in the database')
            }
            shortUrl = config.webhost + shortenKey
            res.send({
              shortUrl
            })
          })
        }).error(err => {
          console.error(err)
          return res.status(500).send('Error')
        })
      }).error(err => {
        if (err) {
          console.error(err)
          return res.status(500).send('Error')
        }
      })
    }
  }).error(err => {
    console.error(err)
    return res.status(500).send('Error')
  })
})

router.get('/:shortenKey', (req, res) => {
  let shortenKey = req.params.shortenKey

  // Fetch the long url by the encoded key
  redisClient.get(shortenKey, (err, reply) => {
    if (err) {
      res.status(500).send('Error: unable to fetch the requested URL')
      return
    }

    if (reply) {
      // There is match with the short url
      res.redirect(reply)
    } else {
      // Not found, redirect to the homepage
      res.redirect(config.webhost)
    }
  })
})

module.exports = router
