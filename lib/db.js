'use strict'

const { MongoClient } = require('mongodb')

const {
  DB_USER,
  DB_HOST,
  DB_PASSWORD,
  DB_NAME
} = process.env

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}?retryWrites=true&w=majority`

let connection

async function connectDB () {
  if (connection) return connection

  let client

  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true
    })

    connection = client.db(DB_NAME)
  } catch (error) {
    console.error('Could not connect to DB', mongoUrl, error)
    process.exit(1)
  }

  return connection
}

module.exports = connectDB
