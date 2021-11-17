/* eslint-disable no-param-reassign */
const { mongo } = require('../common/mongo-client')
const logger = require('../common/logger')

const execute = async (ip, month = null, year = null) => {
  if (!month) month = new Date().getMonth() + 1
  if (!year) year = new Date().getYear() + 1900

  const mongoClient = await mongo.getClient()
  try {
    const accessData = await mongoClient
      .db('access_control')
      .collection('requests')
      .findOne({ ip, month, year })

    logger.info('src/queries/save-incoming-request-to-access-control.js - Access data found by IP', { ip, accessData })
    return accessData
  } catch (err) {
    logger.error('src/queries/save-incoming-request-to-access-control.js - Something went wrong when fetching access data by IP', {
      ip,
      error: err.message
    })

    return null
  }
}

module.exports = {
  execute
}
