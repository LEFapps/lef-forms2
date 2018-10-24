import { Library } from './Library'
import { isArray, isFunction, stubArray } from 'lodash'

// cannot be used by require() since it's not imported anywhere else
import GenericInputNoChildren from './components/GenericInputNoChildren'

const library = new Library([
  ['divider', './components/Divider'],
  ['infobox', './components/InfoBox'],
  ['textarea', './components/Textarea'],
  ['text', './components/Text'],
  ['checkbox', './components/Checkbox'],
  ['select', './components/Select'],
  ['select-collection', './components/SelectCollection'],
  ['password', './components/GenericInputNoChildren'],
  ['email', './components/GenericInputNoChildren'],
  ['phone', './components/GenericInputNoChildren'],
  ['url', './components/GenericInputNoChildren'],
  ['number', './components/GenericInputNoChildren'],
  ['datetime-local', './components/GenericInputNoChildren']
])

// replace the paths with components and their config

library.forEach((path, name) => {
  const component = require(path)
  library.set(name, {
    component: component.default,
    config: isArray(isFunction(component.config) ? component.config() : null)
      ? component.config
      : stubArray
  })
})

export default library
