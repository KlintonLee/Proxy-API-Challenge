const { expect } = require('chai')
const rateLimit = require('../../src/common/rate-limit')
const config = require('../../src/common/config')
const { redisClient } = require('../../src/common/db-connections')

describe('rate-limit.test.js', () => {
  afterEach(() => {
    sinon.restore()
  })

  it(`Given an '0.0.0.0' as userIP and '/api/home' as path
      When call rateLimit.execute(userIP, path) with no cache content
      Then return 10 and redis set method should be called like:
        redis.set('0.0.0.0:/api/home', 10, 'EX', 120)
        considering max request limit as 10 and expire time as 120`, async () => {
    sinon.stub(config.rateLimit, 'maxPerIPWithPath').value(10)
    sinon.stub(config.rateLimit, 'expireTimeInSeconds').value(120)
    const stubOfRedisGetMethod = sinon.stub(redisClient, 'get')
    const stubOfRedisSetMethod = sinon.stub(redisClient, 'set')

    await rateLimit.execute('0.0.0.0', '/api/home')

    expect(stubOfRedisGetMethod.calledOnce).to.be.true
    expect(stubOfRedisSetMethod.calledWith('0.0.0.0:/api/home', 10, 'EX', 120)).to.be.true
  })

  it(`Given an '0.0.0.0' as userIP and '/api/home' as path
      When call rateLimit.execute(userIP, path) with cache containing 6
        remaining tokens
      Then return 5 and redis set method should be called like:
        redis.set('0.0.0.0:/api/home', 5, 'EX', 120)
        considering expire time as 120`, async () => {
    sinon.stub(config.rateLimit, 'expireTimeInSeconds').value(120)
    sinon.stub(redisClient, 'get').returns(6)
    const stubOfRedisSetMethod = sinon.stub(redisClient, 'set')

    const tokensLeft = await rateLimit.execute('0.0.0.0', '/api/home')

    expect(tokensLeft).to.be.eq(5)
    expect(stubOfRedisSetMethod.calledWith('0.0.0.0:/api/home', 5, 'EX', 120)).to.be.true
  })

  it(`Given an '0.0.0.0' as userIP and '/api/home' as path
      When call rateLimit.execute(userIP, path) with cache containing 1
        remaining tokens
      Then return 0 and redis set method should not be called`, async () => {
    sinon.stub(config.rateLimit, 'expireTimeInSeconds').value(120)
    sinon.stub(redisClient, 'get').returns(1)
    const stubOfRedisSetMethod = sinon.stub(redisClient, 'set')

    const tokensLeft = await rateLimit.execute('0.0.0.0', '/api/home')

    expect(tokensLeft).to.be.eq(0)
    expect(stubOfRedisSetMethod.notCalled).to.be.true
  })
})
