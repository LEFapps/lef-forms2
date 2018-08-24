
const config = [
  {
    name: 'formgroup',
    path: './decorators/FormGroup'
  },
  {
    name: 'attributes',
    path: './decorators/Attributes'
  },
  {
    name: 'layout',
    path: "./decorators/Layout"
  },
]

let decorators = {}

for (let decorator of config) {
  decorators[decorator.name] = require(decorator.path).default
}

let DecoratorConfiguration = {}


for (let decorator of config) {
  DecoratorConfiguration[decorator.name] = require(decorator.path).config
}

export default decorators
export { DecoratorConfiguration }
