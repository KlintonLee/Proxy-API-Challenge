/* eslint-disable no-param-reassign */
const countMonthYearTotalAccesses = require('../queries/count-month-year-total-accesses')
const findAccessDetailPerPage = require('../queries/find-accesses-detail-per-page')

const execute = async (month, year, page) => {
  if (!month) month = new Date().getMonth() + 1
  if (!year) year = new Date().getYear() + 1900
  if (!page) page = 1

  const { totalDiff, totalAccesses } = await countMonthYearTotalAccesses.execute(month, year)
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
