const { assert } = require('chai')
const { Presenter } = require('../dist/index')

class AsyncTest extends Presenter {

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async execute() {
    await this.timeout(10)
    return 'success'
  }

}

class AsyncTestWithError extends Presenter {

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async execute() {
    await this.timeout(10)
    throw "I decided to error"
    return 'success'
  }

}

class SyncTest extends Presenter {

  execute() {
    return 'success'
  }

}

class SyncTestWithError extends Presenter {

  execute() {
    throw 'I decided to error'
    return 'success'
  }

}

class SyncCallbackTest extends Presenter {

  execute(callback) {
    callback(null, 'success')
  }

}

class SyncCallbackTestWithError extends Presenter {

  execute(callback) {
    callback('I decided to error', null)
  }

}


describe("Presenter", () => {
  describe("#then", () => {
    it("performs an async execute function", async () => {
      const presenter = new AsyncTest
      const result = await presenter
      assert.strictEqual(result, 'success')
    })
    it("performs an async execute function with error", async () => {
      const presenter = new AsyncTestWithError
      try {
        const result = await presenter
        throw 'should have failed'
      } catch (error) {
        assert.strictEqual(error, 'I decided to error')
      }
    })
    it("performs an sync execute function", async () => {
      const presenter = new SyncTest
      const result = await presenter
      assert.strictEqual(result, 'success')
    })
    it("performs an sync execute function with error", async () => {
      const presenter = new SyncTestWithError
      try {
        const result = await presenter
        throw 'should have failed'
      } catch (error) {
        assert.strictEqual(error, 'I decided to error')
      }
    })
    it("performs an sync callback execute function", async () => {
      const presenter = new SyncCallbackTest
      const result = await presenter
      assert.strictEqual(result, 'success')
    })
    it("performs an sync callback execute function with error", async () => {
      const presenter = new SyncCallbackTestWithError
      try {
        const result = await presenter
        throw 'should have failed'
      } catch (error) {
        assert.strictEqual(error, 'I decided to error')
      }
    })
  })
})
