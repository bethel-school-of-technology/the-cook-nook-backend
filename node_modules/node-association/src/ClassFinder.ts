import * as inflection from 'inflection'
import * as ExtendableError from 'es6-error'
import * as Path from 'path'
import * as fs from 'fs'

const HIERACHY_DIVIDER = '::'

let localPath = Path.join(__dirname, '../..')
let parentPath = Path.join(localPath, '../..')
while (Path.basename(parentPath) === 'node_modules') {
  localPath = parentPath
  parentPath = Path.join(localPath, '../..')
}
if (Path.basename(localPath) === 'node_modules') {
  localPath = Path.join(localPath, '..')
}

// @ts-ignore: ExtendableError miss match imported interface
export class ClassLocationError extends ExtendableError {
  constructor(message='cannot find directory for class search') {
    super(message)
  }
}

export class ClassFinder {

  static _classLocation: any
  static _classFor: any

  static get localPath() {
    return localPath
  }

  static get searchPath() {
    return ['', 'dist', 'lib', 'src']
  }

  static get hierarchyDivider() {
    return HIERACHY_DIVIDER
  }

  static classLocation(classType: string) {
    if (!this._classLocation) this._classLocation = {}
    if (!this._classLocation[classType]) {
      this._classLocation[classType] = this.resolveClassLocation(classType)
    }
    return this._classLocation[classType]
  }

  static resolveClassLocation(classType: string) {
    const folderName = inflection.pluralize(classType[0].toLowerCase() + classType.substr(1))
    // @ts-ignore: cannot properly type Array.some
    let folderPath
    this.searchPath.some(path => {
      const fullPath = Path.join(this.localPath, path, folderName)
      if (fs.existsSync(fullPath)) {
        folderPath = fullPath
        return true
      }
    })

    if (!folderPath) throw new ClassLocationError(`cannot find directory for class ${classType}`)
    return folderPath
  }

  static classForRequire(name: string, classType: string) {
    let Controller
    const classLocation = this.classLocation(classType)
    const pathSubstitutedNamespace = name.replace(this.hierarchyDivider, '/')
    try {
      Controller = require(Path.join(classLocation, pathSubstitutedNamespace + classType))
    } catch (error) {
      console.warn(error)
      if (!error.message.match(/Cannot find module/)) throw error
      Controller = require(Path.join(classLocation, pathSubstitutedNamespace))
    }
    return Controller
  }

  static removeNamespace(name: string) {
    const splitByNamespace = name.split(this.hierarchyDivider)
    return splitByNamespace[splitByNamespace.length - 1]
  }

  static classFor(name: string, classType: string) {
    if (!this._classFor) this._classFor = {}
    if (this._classFor[name + classType]) return this._classFor[name + classType]

    const requiredClass = this.classForRequire(name, classType)
    const namespacelessName = this.removeNamespace(name)
    if (typeof requiredClass === 'function') return (this._classFor[name + classType] = requiredClass)
    if (requiredClass[namespacelessName + classType]) return (this._classFor[name + classType] = requiredClass[namespacelessName + classType])
    if (requiredClass[namespacelessName]) return (this._classFor[name + classType] = requiredClass[namespacelessName])
    if (requiredClass.default) return (this._classFor[name + classType] = requiredClass.default)
  }
}
