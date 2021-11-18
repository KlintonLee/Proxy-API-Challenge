/* eslint-disable no-param-reassign */
const { mongo } = require('../common/mongo-client')
const logger = require('../common/logger')

const execute = async (month, year) => {
  const mongoClient = await mongo.getClient()
  try {
    const accessCount = await mongoClient
      .db('access_control')
      .collection('requests')
      .aggregate([
        {
          $match: { month, year }
        }, {
          $project: {
            total: { $size: '$accesses' }
          }
        }
      ]).toArray()

    const totalDiff = accessCount.length
    const totalAccesses = accessCount.reduce((acc, accessData) => acc + accessData.total, 0)

    logger.info('src/queries/count-month-year-total-accesses.js - Total access by month and year', { month, year, totalAccesses })
    return {
      totalDiff,
      totalAccesses
    }
  } catch (err) {
    logger.error('src/queries/count-month-year-total-accesses.js - Something went wrong when fetching access data by IP', {
      month,
      year,
      error: err.message
    })

    return null
  }
}

module.exports = {
  execute
}
