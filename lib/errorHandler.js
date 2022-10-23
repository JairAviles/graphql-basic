'use strict'

function errorHandler (err) {
  console.error(err)
  throw new Error('Something went wrong', err)
}

module.exports = errorHandler
