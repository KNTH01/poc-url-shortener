'use strict'

class Base58 {

  /**
   * utility function to convert base 10 integer to base 58 string
   * @param  {[type]} num [description]
   * @return {[type]}     [description]
   */
  static encode (num) {
    let encoded = ''
    while (num) {
      let remainder = num % Base58.base
      num = Math.floor(num / Base58.base)
      encoded = Base58.alphabet[remainder].toString() + encoded
    }
    return encoded
  }

  /**
   * utility function to convert a base 58 string to base 10 integer
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  static decode (str) {
    let decoded = 0
    while (str) {
      let index = Base58.alphabet.indexOf(str[0])
      let power = str.length - 1
      decoded += index * (Math.pow(Base58.base, power))
      str = str.substring(1)
    }
    return decoded
  }
}

Base58.alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
Base58.base = Base58.alphabet.length // base is the length of the Base58.alphabet (58 in this case)

module.exports = Base58
