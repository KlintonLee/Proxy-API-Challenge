const config = {
  app: {
    nodeEnv: process.env.NODE_ENV || 'develop',
    port: process.env.APP_PORT,
    errorLogPathFile: process.env.ERROR_LOG_PATH_FILE || null,
    combinedLogPathFile: process.env.COMBINED_LOG_PATH_FILE || null
  }
}

module.exports = config
