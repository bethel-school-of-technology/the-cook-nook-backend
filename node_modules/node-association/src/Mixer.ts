import * as _ from 'lodash'
import * as getDescriptors from 'object.getownpropertydescriptors'

export class Mixer {

  static mixin(aClass: any) {
    const mixinStaticMethods = getDescriptors(aClass)
    Object.keys(mixinStaticMethods).forEach(methodName => {
      if (!_.includes(['prototype', 'name'], methodName)) {
        const method = mixinStaticMethods[methodName]
        Object.defineProperty(this, methodName, method)
      }
    })

    const mixinMethods = getDescriptors(aClass.prototype)
    Object.keys(mixinMethods).forEach(methodName => {
      if (methodName !== 'constructor') {
        const method = mixinMethods[methodName]
        Object.defineProperty(this.prototype, methodName, method)
      }
    })
  }

}

