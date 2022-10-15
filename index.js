'use strict'

const { graphql, buildSchema } = require('graphql')

// Defining initial schema
const schema = buildSchema(`
    type Query {
        hello: String
        greet: String
    }
`)
const source = "{ hello, greet }"

// Config resolvers
const rootValue = {
  hello: () => 'Hello world',
  greet: () => 'Hi y\'all'
}

// Execute hello query
graphql({schema, source, rootValue})
    .then(response => {
        console.log(response)
    })
    .catch(error => console.log(error.message))
