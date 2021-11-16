const redisClient = require('../../common/redis-client')
const config = require('../../common/config')

const execute = async (userIp, urlPath) => {
  const { maxPerIPWithPath } = config.rateLimit
  let tokensLeft = 0

  const exists = await redisClient.get(`${userIp}:${urlPath}`)
  if (exists) {
    const renewToken = parseInt(exists, 10) - 1

    if (renewToken > 0) {
      await redisClient.set(`${userIp}:${urlPath}`, renewToken)
      tokensLeft = renewToken
    }

    return tokensLeft
  }

  await redisClient.set(`${userIp}:${urlPath}`, maxPerIPWithPath)
  tokensLeft = maxPerIPWithPath

  return tokensLeft
}

module.exports = {
  execute
}
