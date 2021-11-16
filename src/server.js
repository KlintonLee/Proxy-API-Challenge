const fastify = require('fastify')({ logger: true })
const { initMongoPoolConnection, mongo } = require('./common/mongo-client')

const endpointRedirectController = require('./controllers/endpoint-redirect-controller')

fastify.get('/*', endpointRedirectController.handle)

const start = async () => {
  const res = await initMongoPoolConnection()
  mongo.setClient(res)

  try {
    await fastify.listen(3333)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
