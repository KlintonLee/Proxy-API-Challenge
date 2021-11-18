const redirectToAPI = require('../http/redirect-to-api')
const saveIncomingRequestToAccessControl = require('../queries/save-incoming-request-to-access-control')

const execute = async ({
  ip, url, headers, body
}) => {
  await saveIncomingRequestToAccessControl.execute(ip, url)

  const response = await redirectToAPI.execute(url, headers, body)

  return response
}

module.exports = {
  execute
}
