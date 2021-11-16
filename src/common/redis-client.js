const Redis = require('ioredis')
const config = require('./config')

const redisConfig = config.database.redis

const redisClient = new Redis(redisConfig)

const get = async (key) => {
  const value = await redisClient.get(key)

  return value
}

const set = async (key, value) => {
  const { expireTimeInSeconds } = config.rateLimit

  await redisClient.set(key, value, 'EX', expireTimeInSeconds)
}

module.exports = {
  get,
  set
}
