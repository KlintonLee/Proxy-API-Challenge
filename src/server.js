const fastify = require('fastify')({ logger: true })
const { initMongoPoolConnection, mongo } = require('./common/mongo-client')
const { statisticsRouter } = require('./routes/statistics-router')
const config = require('./common/config')
const logger = require('./common/logger')

const { name, nodeEnv, port } = config.app

const endpointRedirectController = require('./controllers/endpoint-redirect-controller')

statisticsRouter.forEach((route) => {
  fastify.route(route)
})
fastify.get('/*', endpointRedirectController.handle)

const start = async () => {
  const res = await initMongoPoolConnection()
  mongo.setClient(res)

  try {
    logger.info(`src/server.js - ${name} running at port ${port} as ${nodeEnv} mode`)
    await fastify.listen(3333)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
