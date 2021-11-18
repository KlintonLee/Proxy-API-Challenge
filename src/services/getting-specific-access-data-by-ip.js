const logger = require('../common/logger')
const findAccessDataByIp = require('../queries/find-access-data-by-ip')

const execute = async (ip, month, year) => {
  if (!month) month = new Date().getMonth() + 1
  if (!year) year = new Date().getYear() + 1900

  logger.info('src/services/getting-specific-access-data-by-ip.js - Getting access data from IP', { ip })
  const accessData = await findAccessDataByIp.execute(ip, month, year)

  return accessData
}

module.exports = {
  execute
}
