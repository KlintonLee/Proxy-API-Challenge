const { expect } = require('chai')
const findAccessDataByIp = require('../../src/queries/find-access-data-by-ip')
const gettingSpecificAccessDataByIpService = require('../../src/services/getting-specific-access-data-by-ip-service')

describe('getting-general-access-data-service.test.js', () => {
  afterEach(() => {
    sinon.restore()
  })

  it(`Given ip = '127.0.0.1', month = 11 and year = 2021
        and mock of findAccessDataByIp method returning {
          _id: '619673cd842c45380833cc95',
          ip: '127.0.0.1',
          path: '/home',
          month: 11,
          year: 2021,
          accesses: [
            '2021-11-18T12:39:57.866Z',
            '2021-11-18T12:39:59.745Z'
          ]
        }
      When call gettingSpecificAccessDataByIpService.execute(month, year, page)
      Then countMonthYearTotalAccesses method should be called with month and year
        and also findAccessDetailPerPage method should be called with month, year, page - 1
        and finally return same result of findAccessDataByIp method`, async () => {
    const expected = {
      _id: '619673cd842c45380833cc95',
      ip: '127.0.0.1',
      path: '/home',
      month: 11,
      year: 2021,
      accesses: [
        '2021-11-18T12:39:57.866Z',
        '2021-11-18T12:39:59.745Z'
      ]
    }

    const stupFindAccessDataByIp = sinon.stub(findAccessDataByIp, 'execute').returns(expected)

    const response = await gettingSpecificAccessDataByIpService.execute('127.0.0.1', 11, 2021)

    expect(stupFindAccessDataByIp.calledWith('127.0.0.1', 11, 2021)).to.be.true
    expect(response).to.be.eql(expected)
  })

  it(`Given ip = '127.0.0.1', month and year as null
      When call gettingSpecificAccessDataByIpService.execute(month, year, page)
      Then month should be filled with new Date().getMonth() + 1
        and year should be filled with new Date().getYear() + 1900`, async () => {
    const stupFindAccessDataByIp = sinon.stub(findAccessDataByIp, 'execute')

    await gettingSpecificAccessDataByIpService.execute('127.0.0.1', null, null)

    const month = new Date().getMonth() + 1
    const year = new Date().getYear() + 1900
    expect(stupFindAccessDataByIp.calledWith('127.0.0.1', month, year)).to.be.true
  })
})
