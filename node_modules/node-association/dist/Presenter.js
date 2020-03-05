"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mixer_1 = require("./Mixer");
class Presenter extends Mixer_1.Mixer {
    execute(callback) { }
    then(onFulfilled, onRejected) {
        const execute = this.execute;
        // @ts-ignore: cannot then on not extended execute function
        if (execute.constructor.name === 'AsyncFunction')
            return this.execute().then(onFulfilled, onRejected);
        if (!execute.length)
            return Promise.resolve(this.execute()).then(onFulfilled, onRejected);
        return new Promise((resolve, reject) => {
            this.execute((error, result) => {
                if (error) {
                    if (onRejected)
                        return onRejected(error);
                    reject(error);
                }
                if (onFulfilled)
                    return onFulfilled(result);
                resolve(result);
            });
        });
    }
}
exports.Presenter = Presenter;
