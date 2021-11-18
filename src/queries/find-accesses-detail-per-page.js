/* eslint-disable no-param-reassign */
const { mongo } = require('../common/mongo-client')

const execute = async (month, year, page) => {
  const mongoClient = await mongo.getClient()
  try {
    const cursor = await mongoClient
      .db('access_control')
      .collection('requests')
      .find({ month, year })
      .skip(100 * page)
      .limit(100)
      .map((val) => {
        val.accesses = val.accesses.length
        return val
      })

    return cursor.toArray()
  } catch (err) {
    return null
  }
}

module.exports = {
  execute
}
