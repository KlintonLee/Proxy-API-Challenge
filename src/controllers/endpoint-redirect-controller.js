const config = require('../common/config')
const redisClient = require('../common/redis-client')
const rateLimitService = require('../services/rate-limit-service')
const callExternalApiService = require('../services/call-external-api-service')
const logger = require('../common/logger')

const handle = async (request, reply) => {
  // eslint-disable-next-line object-curly-newline
  const { ip, url, headers, body } = request

  const tokensLeft = await rateLimitService.execute(ip, url, redisClient)

  const { maxRequests, expireTimeInSeconds } = config.rateLimit
  const rateLimitRemaining = !tokensLeft ? 0 : tokensLeft - 1

  reply.headers({
    'X-RateLimit-Limit': maxRequests,
    'X-RateLimit-Remaining': rateLimitRemaining,
    'X-RateLimit-Reset': expireTimeInSeconds
  })

  if (!tokensLeft) {
    logger.warn('src/controllers/endpoint-redirect-controller.js - User made many requests, no more tokens left', { ip, url })
    return reply.code(400).send('Too many requests')
  }

  const apiResponse = await callExternalApiService.execute({
    ip, url, headers, body
  })
  if (apiResponse.success) {
    return apiResponse
  }

  logger.error('src/controllers/endpoint-redirect-controller.js - An unexpected error occurred', { ip, url })
  return reply.code(400).send({ message: 'Something went wrong, please try again later.' })
}

module.exports = {
  handle
}
