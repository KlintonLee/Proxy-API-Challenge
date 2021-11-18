const countMonthYearTotalAccesses = require('../../src/queries/count-month-year-total-accesses')
const findAccessDetailPerPage = require('../../src/queries/find-accesses-detail-per-page')
const gettingGeneralAccessDataService = require('../../src/services/getting-general-access-data-service')

describe('getting-general-access-data-service.test.js', () => {
  afterEach(() => {
    sinon.restore()
  })

  it(`Given month = 11, year = 2021 and page = 1
        mock of countMonthYearTotalAccesses returning { totalDiff: 2, totalAccesses: 2 }
        and also findAccessDetailPerPage returning [{
          _id: '619673cd842c45380833cc95',
          ip: '127.0.0.1',
          path: '/home',
          month: 11,
          year: 2021,
          accesses: 2
        }]
      When call gettingGeneralAccessDataService.execute(month, year, page)
      Then countMonthYearTotalAccesses method should be called with month and year
        and also findAccessDetailPerPage method should be called with month, year, page - 1
        and finally return {
          pageNumber: 1,
          pageSize: 1,
          month: 11,
          year: 2021,
          totalAccesses: 2,
          accessesDetail: [
            {
              _id: '619673cd842c45380833cc95',
              ip: '127.0.0.1',
              path: '/home',
              month: 11,
              year: 2021,
              accesses: 2
            }
          ]
        }`, async () => {
    const stubCountMonthYearTotalAccesses = sinon.stub(countMonthYearTotalAccesses, 'execute')
      .returns({ totalDiff: 2, totalAccesses: 2 })
    const stubFindAccessDetailPerPage = sinon.stub(findAccessDetailPerPage, 'execute')
      .returns([{
        _id: '619673cd842c45380833cc95',
        ip: '127.0.0.1',
        path: '/home',
        month: 11,
        year: 2021,
        accesses: 2
      }])

    const response = await gettingGeneralAccessDataService.execute(11, 2021, 1)

    const expected = {
      pageNumber: 1,
      pageSize: 1,
      month: 11,
      year: 2021,
      totalAccesses: 2,
      accessesDetail: [
        {
          _id: '619673cd842c45380833cc95',
          ip: '127.0.0.1',
          path: '/home',
          month: 11,
          year: 2021,
          accesses: 2
        }
      ]
    }

    expect(stubCountMonthYearTotalAccesses.calledWith(11, 2021)).to.be.true
    expect(stubFindAccessDetailPerPage.calledWith(11, 2021, 0)).to.be.true
    expect(response).to.be.eql(expected)
  })

  it(`Given month, year and page as null
      When call gettingGeneralAccessDataService.execute(month, year, page)
      Then month should be filled with new Date().getMonth() + 1
        and year should be filled with new Date().getYear() + 1900
        and page should be setted with 1`, async () => {
    sinon.stub(countMonthYearTotalAccesses, 'execute').returns({ totalDiff: 'mock', totalAccesses: 'mock' })
    const stubFindAccessDetailPerPage = sinon.stub(findAccessDetailPerPage, 'execute')

    await gettingGeneralAccessDataService.execute(null, null, null)

    const month = new Date().getMonth() + 1
    const year = new Date().getYear() + 1900
    const page = 1
    expect(stubFindAccessDetailPerPage.calledWith(month, year, page - 1)).to.be.true
  })
})
