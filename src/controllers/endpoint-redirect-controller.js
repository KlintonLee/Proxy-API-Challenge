const redirectToAPI = require('../http/redirect-to-api')
const rateLimit = require('../business/rate-limit/token-bucket-algorithm')
const config = require('../common/config')

const handle = async (request, reply) => {
  // eslint-disable-next-line object-curly-newline
  const { ip, url, headers, body } = request

  const tokensLeft = await rateLimit.execute(ip, url)

  const { maxPerIPWithPath, expireTimeInSeconds } = config.rateLimit
  const rateLimitRemaining = tokensLeft === 0 ? 0 : tokensLeft - 1

  reply.headers({
    'X-RateLimit-Limit': maxPerIPWithPath,
    'X-RateLimit-Remaining': rateLimitRemaining,
    'X-RateLimit-Reset': expireTimeInSeconds
  })

  if (tokensLeft === 0) {
    return reply.code(400).send('To many requests')
  }

  const response = await redirectToAPI.execute(url, headers, body)
  if (response.success) {
    return response
  }

  return reply.code(400).send({ message: 'Something went wrong, please try again later.' })
}

module.exports = {
  handle
}
