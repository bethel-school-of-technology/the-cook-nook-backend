const { assert } = require('chai')
const { ClassFinder } = require('../dist/index')

Object.defineProperty(ClassFinder, 'localPath', {
  get: function() { return __dirname }
})

describe("ClassFinder", () => {
  describe("#classLocation", () => {
    it("finds the path for tests", async () => {
      const path = ClassFinder.classLocation('Test')
      assert.strictEqual(path, `${__dirname}/tests`)
    })
    it("finds the path for plans", async () => {
      const path = ClassFinder.classLocation('Plan')
      assert.strictEqual(path, `${__dirname}/src/plans`)
    })
    it("finds the path for tasks", async () => {
      const path = ClassFinder.classLocation('Task')
      assert.strictEqual(path, `${__dirname}/lib/tasks`)
    })
    it("finds the path for lives", async () => {
      const path = ClassFinder.classLocation('Life')
      assert.strictEqual(path, `${__dirname}/dist/lives`)
    })
    it("finds the path for namespaces", async () => {
      const path = ClassFinder.classLocation('Namespace')
      assert.strictEqual(path, `${__dirname}/namespaces`)
    })
    it("errors finding no existent type Death", async () => {
      try {
        const path = ClassFinder.classLocation('Death')
        throw 'should have failed'
      } catch (error) {
        assert.strictEqual(error.constructor.name, 'ClassLocationError')
      }
    })
  })
  describe("#classForRequire", () => {
    it("find the path for class More Test", () => {
      const Class = ClassFinder.classForRequire('More', 'Test')
      assert.isOk(Class)
    })
    it("find the path for class Nested Test", () => {
      const Class = ClassFinder.classForRequire('Nested', 'Test')
      assert.isOk(Class)
    })
    it("find the path for class Random Test", () => {
      const Class = ClassFinder.classForRequire('Random', 'Test')
      assert.isOk(Class)
    })
    it("find the path for class More Plan", () => {
      const Class = ClassFinder.classForRequire('More', 'Plan')
      assert.isOk(Class)
    })
    it("find the path for class Nested Plan", () => {
      const Class = ClassFinder.classForRequire('Nested', 'Plan')
      assert.isOk(Class)
    })
    it("find the path for class Random Plan", () => {
      const Class = ClassFinder.classForRequire('Random', 'Plan')
      assert.isOk(Class)
    })
    it("find the path for class More Plan", () => {
      const Class = ClassFinder.classForRequire('More', 'Task')
      assert.isOk(Class)
    })
    it("find the path for class Nested Plan", () => {
      const Class = ClassFinder.classForRequire('Nested', 'Task')
      assert.isOk(Class)
    })
    it("find the path for class Random Plan", () => {
      const Class = ClassFinder.classForRequire('Random', 'Task')
      assert.isOk(Class)
    })
    it("find the path for class More Plan", () => {
      const Class = ClassFinder.classForRequire('More', 'Life')
      assert.isOk(Class)
    })
    it("find the path for class Nested Plan", () => {
      const Class = ClassFinder.classForRequire('Nested', 'Life')
      assert.isOk(Class)
    })
    it("find the path for class Random Plan", () => {
      const Class = ClassFinder.classForRequire('Random', 'Life')
      assert.isOk(Class)
    })
    it("find the path for class More Plan", () => {
      const Class = ClassFinder.classForRequire('Namespace::More', 'Namespace')
      assert.isOk(Class)
    })
    it("find the path for class Nested Plan", () => {
      const Class = ClassFinder.classForRequire('Namespace::Nested', 'Namespace')
      assert.isOk(Class)
    })
    it("find the path for class Random Plan", () => {
      const Class = ClassFinder.classForRequire('Namespace::Random', 'Namespace')
      assert.isOk(Class)
    })
    it("find the path for class Random Plan", () => {
      try {
        const Class = ClassFinder.classForRequire('Death', 'Test')
        throw 'should have failed'
      } catch (error) {
        assert.isOk(error.message.match(/Cannot find module/))
      }
    })
  })
  describe("#classFor", () => {
    it("find the path for class More Test", () => {
      const Class = ClassFinder.classFor('More', 'Test')
      assert.strictEqual(Class.name, 'More')
    })
    it("find the path for class Nested Test", () => {
      const Class = ClassFinder.classFor('Nested', 'Test')
      assert.strictEqual(Class.name, 'Nested')
    })
    it("find the path for class Random Test", () => {
      const Class = ClassFinder.classFor('Random', 'Test')
      assert.strictEqual(Class.name, 'RandomTest')
    })
    it("find the path for class More Plan", () => {
      const Class = ClassFinder.classFor('More', 'Plan')
      assert.strictEqual(Class.name, 'More')
    })
    it("find the path for class Nested Plan", () => {
      const Class = ClassFinder.classFor('Nested', 'Plan')
      assert.strictEqual(Class.name, 'Nested')
    })
    it("find the path for class Random Plan", () => {
      const Class = ClassFinder.classFor('Random', 'Plan')
      assert.strictEqual(Class.name, 'RandomPlan')
    })
    it("find the path for class More Plan", () => {
      const Class = ClassFinder.classFor('More', 'Task')
      assert.strictEqual(Class.name, 'More')
    })
    it("find the path for class Nested Plan", () => {
      const Class = ClassFinder.classFor('Nested', 'Task')
      assert.strictEqual(Class.name, 'Nested')
    })
    it("find the path for class Random Plan", () => {
      const Class = ClassFinder.classFor('Random', 'Task')
      assert.strictEqual(Class.name, 'RandomTask')
    })
    it("find the path for class More Plan", () => {
      const Class = ClassFinder.classFor('More', 'Life')
      assert.strictEqual(Class.name, 'More')
    })
    it("find the path for class Nested Plan", () => {
      const Class = ClassFinder.classFor('Nested', 'Life')
      assert.strictEqual(Class.name, 'Nested')
    })
    it("find the path for class Random Plan", () => {
      const Class = ClassFinder.classFor('Random', 'Life')
      assert.strictEqual(Class.name, 'RandomLife')
    })
    it("find the path for class More Plan", () => {
      const Class = ClassFinder.classFor('Namespace::More', 'Namespace')
      assert.strictEqual(Class.name, 'More')
    })
    it("find the path for class Nested Plan", () => {
      const Class = ClassFinder.classFor('Namespace::Nested', 'Namespace')
      assert.strictEqual(Class.name, 'Nested')
    })
    it("find the path for class Random Plan", () => {
      const Class = ClassFinder.classFor('Namespace::Random', 'Namespace')
      assert.strictEqual(Class.name, 'RandomNamespace')
    })
  })
})
