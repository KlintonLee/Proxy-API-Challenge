const { mongo } = require('../common/mongo-client')
const logger = require('../common/logger')

const execute = async (ip, path) => {
  const millisecondsToHour = 60 * 60 * 1000
  const date = new Date(new Date().getTime() - millisecondsToHour * 3)
  const month = date.getMonth() + 1
  const year = date.getYear() + 1900

  const mongoClient = await mongo.getClient()
  try {
    const clientExists = await mongoClient
      .db('access_control')
      .collection('requests')
      .findOne({
        ip, path, month, year
      })

    if (clientExists) {
      await mongoClient
        .db('access_control')
        .collection('requests')
        .updateOne({
          ip, path, month, year
        }, { $push: { accesses: date } })

      logger.info('src/queries/save-incoming-request-to-access-control.js - Access request info has updated successfully', { ip, path, date })
      return
    }

    const schema = {
      ip,
      path,
      month,
      year,
      accesses: [date]
    }

    await mongoClient
      .db('access_control')
      .collection('requests')
      .insertOne(schema)

    logger.info('src/queries/save-incoming-request-to-access-control.js - Access request info has created successfully', { schema })
  } catch (err) {
    logger.error('src/queries/save-incoming-request-to-access-control.js - Something went wrong on saving request info to access_control database', {
      error: err.message, ip, path, date
    })
  }
}

module.exports = {
  execute
}
