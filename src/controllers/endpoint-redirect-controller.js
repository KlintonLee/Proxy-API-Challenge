const config = require('../common/config')
const rateLimitService = require('../services/rate-limit-service')
const callExternalApiService = require('../services/call-external-api-service')

const handle = async (request, reply) => {
  // eslint-disable-next-line object-curly-newline
  const { ip, url, headers, body } = request

  const tokensLeft = await rateLimitService.execute(ip, url)

  const { maxPerIPWithPath, expireTimeInSeconds } = config.rateLimit
  const rateLimitRemaining = !tokensLeft ? 0 : tokensLeft - 1

  reply.headers({
    'X-RateLimit-Limit': maxPerIPWithPath,
    'X-RateLimit-Remaining': rateLimitRemaining,
    'X-RateLimit-Reset': expireTimeInSeconds
  })

  if (!tokensLeft) {
    return reply.code(400).send('Too many requests')
  }

  const apiResponse = await callExternalApiService.execute({
    ip, url, headers, body
  })
  if (apiResponse.success) {
    return apiResponse
  }

  return reply.code(400).send({ message: 'Something went wrong, please try again later.' })
}

module.exports = {
  handle
}
