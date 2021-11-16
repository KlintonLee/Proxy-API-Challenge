require('dotenv').config()

const config = {
  app: {
    name: process.env.APP_NAME || 'Proxy API Challenge',
    nodeEnv: process.env.NODE_ENV || 'develop',
    port: process.env.APP_PORT,
    errorLogPathFile: process.env.ERROR_LOG_PATH_FILE || 'logs/error.log',
    combinedLogPathFile: process.env.COMBINED_LOG_PATH_FILE || 'logs/combined.log'
  },
  database: {
    mongo: {
      host: process.env.MONGODB_HOST,
      port: process.env.MONGODB_PORT,
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASS
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS
    }
  },
  destination: {
    baseUrl: process.env.DESTINATION_BASE_URL
  },
  rateLimit: {
    maxPerIPWithPath: process.env.RATE_LIMIT_MAX_REQUESTS_PER_IP_WITH_PATH,
    expireTimeInSeconds: process.env.RATE_LIMIT_EXPIRE_TIME_IN_SECONDS,
    requestsPerURLPath: process.env.RATE_LIMIT_PER_URL_PATH
  }
}

module.exports = config
