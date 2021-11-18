const redisClient = require('../common/redis-client')
const config = require('../common/config')
const logger = require('../common/logger')

const execute = async (userIp, urlPath) => {
  const { limitingByIP, limitingByPath, maxRequests } = config.rateLimit
  let tokensLeft = 0
  let redisKey

  if (limitingByIP && !limitingByPath) redisKey = userIp
  if (!limitingByIP && limitingByPath) redisKey = urlPath
  redisKey = redisKey || `${userIp}:${urlPath}`
  logger.info('src/services/rate-limit-service.js - Mapping redis key based on IP or Path limit rule', { redisKey })

  const exists = await redisClient.get(redisKey)
  if (exists) {
    const renewToken = parseInt(exists, 10) - 1
    logger.info('src/services/rate-limit-service.js - Token already exists, renewing Token', { token: renewToken })

    if (renewToken > 0) {
      await redisClient.set(redisKey, renewToken)
      tokensLeft = renewToken
    }

    return tokensLeft
  }

  logger.info('src/services/rate-limit-service.js - Token does not exists, creating new Token', { token: maxRequests })
  await redisClient.set(redisKey, maxRequests)
  tokensLeft = maxRequests

  return tokensLeft
}

module.exports = {
  execute
}
