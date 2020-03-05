const { assert } = require('chai')
const { Mixer } = require('../dist/index')

const AMixer = class AMixer extends Mixer {

}

const AMixin = class AMixin {
  constructor() {
    this._test = 'test'
  }

  static get get() {
    return this._test
  }

  static set set(value) {
    this._test = value
  }

  static method() {
    return 'test'
  }

  get get() {
    return this._test
  }

  set set(value) {
    this._test = value
  }

  method() {
    return 'test'
  }

  async asyncMethod() {
    return 'test'
  }
}

AMixer.mixin(AMixin)

describe('Mixer', () => {
  describe('#mixin', () => {
    it('did not copy the constructor method', () => {
      const aMixer = new AMixer
      assert.strictEqual(aMixer._test, undefined)
    })
    it('did copy class setter method', () => {
      AMixer.set = 'test'
      assert.strictEqual(AMixer._test, 'test')
    })
    it('did copy class getter method', () => {
      assert.strictEqual(AMixer.get, 'test')
    })
    it('did copy class method', () => {
      assert.strictEqual(AMixer.method(), 'test')
    })
    it('did copy setter method', () => {
      const aMixer = new AMixer
      aMixer.set = 'test'
      assert.strictEqual(aMixer._test, 'test')
    })
    it('did copy getter method', () => {
      const aMixer = new AMixer
      aMixer._test = 'test'
      assert.strictEqual(aMixer.get, 'test')
    })
    it('did copy method', () => {
      const aMixer = new AMixer
      assert.strictEqual(aMixer.method(), 'test')
    })
  })
})
