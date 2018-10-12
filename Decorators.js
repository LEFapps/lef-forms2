import { DecoratorLibrary } from './Library'
import { union, stubTrue, isFunction, isArray } from 'lodash'

/* Note: the sequence here determines the sequence
 * in which they are applied in EasyForm!
 */
const library = new DecoratorLibrary([
  ['validate', './decorators/Validate'],
  ['attributes', './decorators/Attributes'],
  ['formgroup', './decorators/FormGroup'],
  ['layout', './decorators/Layout'],
  ['dependent', './decorators/Dependent']
])

library.forEach((path, name) => {
  const decorator = require(path)
  library.set(name, {
    decorator: decorator.default,
    config: isArray(decorator.config) ? decorator.config : [],
    combine: isFunction(decorator.combine) ? decorator.combine : union,
    filter: isFunction(decorator.filter) ? decorator.filter : stubTrue
  })
})

export default library
