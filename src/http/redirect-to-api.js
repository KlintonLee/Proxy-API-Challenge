const axios = require('axios')
const config = require('../common/config')

const execute = async (url, headers, body, method = 'get') => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  const response = {
    success: false,
    content: null,
    status: null,
    statusText: null
  }

  try {
    const { baseUrl } = config.destination

    // eslint-disable-next-line no-param-reassign
    delete headers.host
    const axiosRequestConfig = {
      method,
      headers,
      withCredentials: true,
      url: `${baseUrl}${url}`,
      data: body
    }

    const { data, status, statusText } = await axios(axiosRequestConfig)

    response.success = true
    response.content = data
    response.status = status
    response.statusText = statusText

    return response
  } catch (err) {
    if (err.response) {
      const { status, statusText, data } = err.response
      response.content = data
      response.status = status
      response.statusText = statusText

      return response
    }

    response.content = err.message
    return response
  }
}

module.exports = {
  execute
}
