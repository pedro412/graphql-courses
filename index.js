'use strict'

require('dotenv').config()
const express = require('express')
const { makeExecutableSchema } = require('graphql-tools')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()

const PORT = process.env.port || 3000

const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.gql'),
  'utf-8'
)

const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
