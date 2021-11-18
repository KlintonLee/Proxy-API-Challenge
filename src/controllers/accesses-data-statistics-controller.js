const logger = require('../common/logger')
const gettingGeneralAccessData = require('../services/getting-general-access-data')
const gettingSpecificAccessDataByIP = require('../services/getting-specific-access-data-by-ip')

const fullAccessData = async (request, _) => {
  const { month, year, page } = request.query

  const response = await gettingGeneralAccessData.execute(
    parseInt(month, 10),
    parseInt(year, 10),
    parseInt(page, 10)
  )

  return response
}

const accessDataByIp = async (request, reply) => {
  const { ip } = request.params
  const { month, year } = request.query

  const accessData = await gettingSpecificAccessDataByIP.execute(
    ip,
    parseInt(month, 10),
    parseInt(year, 10)
  )

  if (!accessData) {
    logger.warn('src/controllers/accesses-data-statistics-controller.js - No data found for this IP address', { ip })
    return reply.code(400).send('No data found for this IP address')
  }

  return accessData
}

module.exports = {
  fullAccessData,
  accessDataByIp
}
