const logger = require('../common/logger')
const redirectToAPI = require('../http/redirect-to-api')
const saveIncomingRequestToAccessControl = require('../queries/save-incoming-request-to-access-control')

const execute = async ({
  ip, url, headers, body
}) => {
  logger.info('src/services/call-external-api-service.js - Received data to request external API', {
    ip, url, headers, body
  })
  await saveIncomingRequestToAccessControl.execute(ip, url)

  logger.info('src/services/call-external-api-service.js - Redirecting request to external API')
  const response = await redirectToAPI.execute(url, headers, body)

  return response
}

module.exports = {
  execute
}
