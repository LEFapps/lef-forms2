import { Library } from './Library'
import { set, isFunction, identity } from 'lodash'

const library = new Library([['repeater', './manipulators/Repeater']])

library.forEach((path, name) => {
  const manipulator = require(path)
  library.set(name, {
    manipulate: isFunction(manipulator.manipulate)
      ? manipulator.manipulate
      : identity
  })
})

export default library
