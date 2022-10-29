'use strict'

require('dotenv').config()

const db = {
  username: process.env.DB_USER ?? '',
  password: process.env.DB_PASSSWD ?? '',
  host: process.env.DB_HOST ?? '',
  name: process.env.DB_NAME ?? ''
}

module.exports = {
  db
}