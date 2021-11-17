const statisticsController = require('../controllers/statistics-controller')

const statisticsRouter = [{
  method: 'GET',
  url: '/api/v1/ips/:ip',
  handler: statisticsController.accessDataByIp
}]

module.exports = {
  statisticsRouter
}
