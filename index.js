'use strict'

const { makeExecutableSchema } = require('@graphql-tools/schema')
const { graphqlHTTP } = require('express-graphql')
const express = require('express')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

// Express vars
const app = express()
const port = process.env.port || 3000

// Defining initial schema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// Config resolvers
const rootValue = resolvers

app.use('/api', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`Server is listening at ${port}`)
})
