require('dotenv').config()
const fastify = require('fastify')({ logger: true })

const config = require('./common/config')

fastify.get('/hello', (_, __) => ({ hello: 'world' }))

const start = async () => {
  try {
    await fastify.listen(config.app.port)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
