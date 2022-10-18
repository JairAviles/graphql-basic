'use strict'

const MongoClient = require('mongodb').MongoClient

const { db } = require('./config')
const { username, password, host, name } = db


const mongoUrl = `mongodb+srv://${username}:${password}@${host}?retryWrites=true&w=majority`

let connection

async function connectDB() {
  if (connection) return connection

  try {
      const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
      connection = client.db(name)
  } catch (error) {
      console.error('An error occurred while connecting to MongoDB', mongoUrl, error)
      process.exit(1)
  }
  return connection
}

module.exports = connectDB
