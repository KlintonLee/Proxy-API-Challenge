const accessesDataStatistics = require('../controllers/accesses-data-statistics-controller')

const statisticsRouter = [
  {
    method: 'GET',
    url: '/api/v1/ips/:ip',
    handler: accessesDataStatistics.accessDataByIp
  },
  {
    method: 'GET',
    url: '/api/v1/accesses',
    handler: accessesDataStatistics.fullAccessData
  }
]

module.exports = {
  statisticsRouter
}
