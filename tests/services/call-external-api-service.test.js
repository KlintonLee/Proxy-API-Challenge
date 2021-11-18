const callExternalApiService = require('../../src/services/call-external-api-service')
const saveIncomingRequestToAccessControl = require('../../src/queries/save-incoming-request-to-access-control')
const redirectToAPI = require('../../src/http/redirect-to-api')

describe('call-external-api-service.test.js', () => {
  afterEach(() => {
    sinon.restore()
  })

  it(`Given an object as parameter containing: {
        ip: '127.0.0.1',
        url: '/user/home',
        headers: { content: 'mock' },
        body: { content: 'mock' }
      }
      When call callExternalApiService.execute(parameter)
      Then saveIncomingRequestToAccess method should be called with parameter IP and URL
        and also redirectToAPI method should be called with parameter URL, headers and body`, async () => {
    const stubSaveIncomingRequestToAccessControl = sinon.stub(saveIncomingRequestToAccessControl, 'execute')
    const stubRedirectToAPI = sinon.stub(redirectToAPI, 'execute')

    const parameter = {
      ip: '127.0.0.1',
      url: '/user/home',
      headers: { content: 'mock' },
      body: { content: 'mock' }
    }
    await callExternalApiService.execute(parameter)

    expect(stubSaveIncomingRequestToAccessControl.calledWith('127.0.0.1', '/user/home')).to.be.true
    expect(stubRedirectToAPI.calledWith('/user/home', { content: 'mock' }, { content: 'mock' })).to.be.true
  })
})
