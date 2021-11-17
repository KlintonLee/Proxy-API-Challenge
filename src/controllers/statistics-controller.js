const findAccessDataByIp = require('../queries/find-access-data-by-ip')

const accessDataByIp = async (request, reply) => {
  const { ip } = request.params
  const { month, year } = request.query

  const accessData = await findAccessDataByIp.execute(
    parseInt(ip, 10),
    parseInt(month, 10),
    parseInt(year, 10)
  )

  if (!accessData) {
    return reply.code(400).send('No data found for this IP address')
  }

  return accessData
}

module.exports = {
  accessDataByIp
}
