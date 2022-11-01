'use strict'

require('dotenv').config()
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { graphqlHTTP } = require('express-graphql')
const express = require('express')
const cors = require('cors')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

// Express vars
const app = express()
const port = process.env.port || 3000
const isDev = process.env.NODE_ENV !== 'production'

// Defining initial schema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

app.use(cors())

app.use('/api', graphqlHTTP({
  schema,
  graphiql: isDev
}))

app.listen(port, () => {
  console.log(`Server is listening at ${port}`)
})
