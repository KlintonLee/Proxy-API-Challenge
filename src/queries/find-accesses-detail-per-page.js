/* eslint-disable no-param-reassign */
const logger = require('../common/logger')
const { mongo } = require('../common/mongo-client')

const execute = async (month, year, page) => {
  const mongoClient = await mongo.getClient()
  try {
    const accessesDetail = await mongoClient
      .db('access_control')
      .collection('requests')
      .find({ month, year })
      .skip(100 * page)
      .limit(100)
      .map((val) => {
        val.accesses = val.accesses.length
        return val
      })
      .toArray()

    logger.info(`src/queries/find-accesses-detail-per-page.js - Accesses details from page ${page + 1}`, { accessesDetail })
    return accessesDetail
  } catch (err) {
    logger.error('src/queries/find-accesses-detail-per-page.js - Something went wrong on getting accesses details', { error: err.message })
    return null
  }
}

module.exports = {
  execute
}
