const { createLogger, transports, format } = require('winston')

const config = require('./config')

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: config.app.name },
  transports: [
    new transports.File({ filename: config.app.errorLogPathFile, level: 'error' }),
    new transports.File({ filename: config.app.combinedLogPathFile })
  ]
})

module.exports = logger
