"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const getDescriptors = require("object.getownpropertydescriptors");
class Mixer {
    static mixin(aClass) {
        const mixinStaticMethods = getDescriptors(aClass);
        Object.keys(mixinStaticMethods).forEach(methodName => {
            if (!_.includes(['prototype', 'name'], methodName)) {
                const method = mixinStaticMethods[methodName];
                Object.defineProperty(this, methodName, method);
            }
        });
        const mixinMethods = getDescriptors(aClass.prototype);
        Object.keys(mixinMethods).forEach(methodName => {
            if (methodName !== 'constructor') {
                const method = mixinMethods[methodName];
                Object.defineProperty(this.prototype, methodName, method);
            }
        });
    }
}
exports.Mixer = Mixer;
