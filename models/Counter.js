'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a model from that schema
const counter = mongoose.model('Counter', new Schema({
  _id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 0
  }
}))

module.exports = counter
