const redirectToAPI = require('../http/redirect-to-api')

const handle = async (request, _) => {
  // eslint-disable-next-line object-curly-newline
  const { url, headers, body } = request

  const response = await redirectToAPI.execute(url, headers, body)

  return response
}

module.exports = {
  handle
}
