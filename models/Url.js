'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Counter = require('./Counter')

// Schema
const urlSchema = new Schema({
  _id: {
    type: Number,
    index: true
  },
  long_url: String,
  created_at: Date
})

// The pre('save', callback) middleware executes the callback function
// every time before an entry is saved to the urls collection.
urlSchema.pre('save', (next) => {
    // find the url_count and increment it by 1
  Counter.findByIdAndUpdate({
    _id: 'url_count'
  }, {
    $inc: {
      seq: 1
    }
  }, (err, counter) => {
    if (err) {
      return next(err)
    }
    // set the _id of the urls collection to the incremented value of the counter
    this._id = counter.seq
    this.created_at = new Date()
    next()
  })
})

const Url = mongoose.model('Url', urlSchema)

module.exports = Url
