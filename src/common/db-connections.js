const { MongoClient } = require('mongodb')
const Redis = require('ioredis')
const config = require('./config')

const mongoConfig = config.database.mongo
const redisConfig = config.database.redis

const mongoURI = `mongodb://${mongoConfig.host}:${mongoConfig.port}`
const mongoClient = new MongoClient(mongoURI, {
  auth: { username: mongoConfig.user, password: mongoConfig.pass }
})

const redisClient = new Redis(redisConfig)

module.exports = {
  redisClient,
  mongoClient
}
