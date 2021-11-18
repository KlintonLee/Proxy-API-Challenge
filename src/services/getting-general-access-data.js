/* eslint-disable no-param-reassign */
const logger = require('../common/logger')
const countMonthYearTotalAccesses = require('../queries/count-month-year-total-accesses')
const findAccessDetailPerPage = require('../queries/find-accesses-detail-per-page')

const execute = async (month, year, page) => {
  if (!month) month = new Date().getMonth() + 1
  if (!year) year = new Date().getYear() + 1900
  if (!page) page = 1

  logger.info(`src/services/getting-general-access-data.js - Counting total access from ${month}/${year}`)
  const { totalDiff, totalAccesses } = await countMonthYearTotalAccesses.execute(month, year)

  logger.info(`src/services/getting-general-access-data.js - Getting Access Details from ${month}/${year}`)
  const accessesDetail = await findAccessDetailPerPage.execute(month, year, page - 1)

  return {
    pageNumber: page,
    pageSize: Math.ceil(totalDiff / 100),
    month,
    year,
    totalAccesses,
    accessesDetail
  }
}

module.exports = {
  execute
}
