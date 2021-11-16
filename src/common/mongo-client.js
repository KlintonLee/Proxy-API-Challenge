const { MongoClient } = require('mongodb')
const config = require('./config')

const {
  user, pass, host, port
} = config.database.mongo

const mongoURI = `mongodb://${user}:${pass}@${host}:${port}`

let mongoClient

const initMongoPoolConnection = async () => {
  const conn = await MongoClient.connect(mongoURI)
  return conn
}

const getMongoClient = () => mongoClient

const setMongoClient = (client) => {
  mongoClient = client
}

module.exports = {
  initMongoPoolConnection,
  mongo: {
    getClient: getMongoClient,
    setClient: setMongoClient
  }
}
