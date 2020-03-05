# node-association
A few base class to extend from, and a class finder system to find those classes

## Installation
```bash
npm install --save node-association
```

## ClassFinder
```javascript
const { ClassFinder } = require('node-association')
```
Class to be found should be organized inside of a folder in the root directory of the node project
For Example we would like to create a series of services where each filer is a Service. Folder should be named using lowercase pluralized version of the class type. Files should be organized in the below manor
```bash
root
|- services
   |- AService.js
   |- AnotherService.js
   |- Namespace
      |- YetAnotherService.js
      |- AlternativeNaming.js
```
Based on the above example to find AService find anywhere in the application by:
```javascript
ClassFinder.classFor('A', 'Service')
```
class file naming is case sensitive

Finding AnotherService:
```javascript
ClassFinder.classFor('Another', 'Service')
```

Finding YetAnotherService with the namespacing:
```javascript
ClassFinder.classFor('Namespace::YetAnother', 'Service')
```
Namespace is also case sensitive

Finding AlternativeNaming:
```javascript
ClassFinder.classFor('AlternativeNaming', 'Service')
```
If desired files can omit the Service portion of the naming.

Too actually require the classes, having is the proper commonjs module exports is also required.
Each of the classes may either have the class be the default export e.g.
```javascript
module.exports = class AService {

}
```
```javascript
export default class AService {

}
```
It is also possible to export the class as an named property e.g.
```javascript
class AService {}
module.exports = {
  AService
}
```
```javascript
class AService {}
export AService
```
The naming of the name export follows the same rules as file naming. It is case sensitive, and the name of the actual class type can be omitted

## Presenter
```javascript
const { Presenter } = require('node-association')
```
A presenter is a base class that can be extended to wrapper both async and sync functionalities
the key performer of the presenter is the instance execute method
```javascript
class Executer extends Presenter {
  execute() {
    console.log("HELLO")
  }
}
const anExecuter = new Executer
(async () => {
  await anExecuter
})() // will print HELLO
```
the execute function can be an async function or standard function with callback or error first callback.

## Mixer
```javascript
const { Mixer } = require('node-association')
```
A mixer is a base class that provides the mixin static method to adding mixin functionality. Mixins will override all static and instance methods except constructor will be copied over to the class prototype
```javascript
class AClass extend Mixer {}
class AMixin {}
AClass.mixin(AMixin)
```
