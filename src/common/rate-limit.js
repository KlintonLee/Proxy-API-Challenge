const { redisClient } = require('./db-connections')
const config = require('./config')

const execute = async (userIp, urlPath) => {
  const { maxPerIPWithPath, expireTimeInSeconds } = config.rateLimit
  let tokensLeft = 0

  const exists = await redisClient.get(`${userIp}:${urlPath}`)
  if (exists) {
    const renewToken = parseInt(exists, 10) - 1

    if (renewToken > 0) {
      await redisClient.set(`${userIp}:${urlPath}`, renewToken, 'EX', expireTimeInSeconds)
      tokensLeft = renewToken
    }

    return tokensLeft
  }

  await redisClient.set(`${userIp}:${urlPath}`, maxPerIPWithPath, 'EX', expireTimeInSeconds)
  tokensLeft = maxPerIPWithPath

  return tokensLeft
}

module.exports = {
  execute
}
