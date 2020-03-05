import { Mixer } from './Mixer'

export class Presenter extends Mixer {

  execute(callback?: any) {}

  then(onFulfilled?: any, onRejected?: any) {
    const execute = this.execute
    // @ts-ignore: cannot then on not extended execute function
    if (execute.constructor.name === 'AsyncFunction') return this.execute().then(onFulfilled, onRejected)
    if (!execute.length) return Promise.resolve(this.execute()).then(onFulfilled, onRejected)

    return new Promise((resolve, reject) => {
      this.execute((error: any, result: any) => {
        if (error) {
          if (onRejected) return onRejected(error)
          reject(error)
        }
        if (onFulfilled) return onFulfilled(result)
        resolve(result)
      })
    })
  }

}
