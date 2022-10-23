'use strict'

const { MongoClient, ServerApiVersion } = require('mongodb');

const { db } = require('./config')
const { username, password, host, name } = db


let client
const mongoUrl = `mongodb+srv://${username}:${password}@${host}/?retryWrites=true&w=majority`

async function connectDb() {

  if (client) return client.db(name)

  try {
    client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    await client.connect()
    console.debug('Connected to MongoDB...')
  } catch (error) {
      console.error('An error occurred while connecting to MongoDB', mongoUrl, error)
      process.exit(1)
  }
  return client.db(name)
}

module.exports = connectDb
