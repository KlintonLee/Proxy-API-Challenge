const redisClient = require('../common/redis-client')
const config = require('../common/config')

const execute = async (userIp, urlPath) => {
  const { limitingByIP, limitingByPath, maxRequests } = config.rateLimit
  let tokensLeft = 0
  let redisKey

  if (limitingByIP && !limitingByPath) redisKey = userIp
  if (!limitingByIP && limitingByPath) redisKey = urlPath
  redisKey = redisKey || `${userIp}:${urlPath}`

  const exists = await redisClient.get(redisKey)
  if (exists) {
    const renewToken = parseInt(exists, 10) - 1

    if (renewToken > 0) {
      await redisClient.set(redisKey, renewToken)
      tokensLeft = renewToken
    }

    return tokensLeft
  }

  await redisClient.set(redisKey, maxRequests)
  tokensLeft = maxRequests

  return tokensLeft
}

module.exports = {
  execute
}
