require('dotenv').config()
const fastify = require('fastify')({ logger: true })
const endpointRedirectController = require('./controllers/endpoint-redirect-controller')

fastify.get('/*', endpointRedirectController.handle)

const start = async () => {
  try {
    await fastify.listen(3333)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
