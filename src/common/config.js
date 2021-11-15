const config = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'develop',
    port: process.env.APP_PORT,
    errorLogPathFile: process.env.ERROR_LOG_PATH_FILE || null,
    combinedLogPathFile: process.env.COMBINED_LOG_PATH_FILE || null
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
  }
}

module.exports = config
