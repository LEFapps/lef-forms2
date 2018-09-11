import { Library } from './Library'
import { isArray } from 'lodash'

const library = new Library([
  ['textarea', './components/Textarea'],
  ['text', './components/Text'],
  ['checkbox', './components/Checkbox'],
  ['select', './components/Select'],
  ['password', './components/GenericInput'],
  ['email', './components/GenericInput'],
  ['phone', './components/GenericInput'],
  ['checkbox', './components/Checkbox']
])

// replace the paths with components and their config

library.forEach((path, name) => {
  const component = require(path)
  library.set(name, {
    component: component.default,
    config: isArray(component.config) ? component.config : []
  })
})

export default library
