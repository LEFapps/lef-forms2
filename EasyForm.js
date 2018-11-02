import React from 'react'
import reformed from './reformed'
import validate from './validate'
import ComponentLibrary from './Components'
import DecoratorLibrary from './Decorators'
import ManipulatorLibrary from './Manipulators'
import { FormComposer } from './FormComposer'
import { FormEditor } from './FormEditor'
import { isEmpty, set } from 'lodash'

class EasyForm {
  constructor ({
    library = ComponentLibrary,
    decorators = DecoratorLibrary,
    manipulators = ManipulatorLibrary
  } = {}) {
    this.library = library
    this.decorators = decorators
    this.manipulators = manipulators
  }
  addComponent (name, component) {
    if (this.library.has(name)) {
      console.log(`Warning: Replacing default ${name} component`)
    }
    this.library.set(name, component)
  }
  removeComponent (name) {
    this.library.delete(name)
  }
  addDecorator (name, decorator) {
    if (this.decorators.has(name)) {
      console.log(`Warning: Replacing default ${name} decorator`)
    }
    this.decorators.set(name, decorator)
  }
  removeDecorator (name) {
    this.decorators.delete(name)
  }
  addManipulator (name, manipulator) {
    if (this.manipulators.has(name)) {
      console.log(`Warning: Replacing default ${name} manipulator`)
    }
    this.manipulators.set(name, manipulator)
  }
  removeManipulator (name) {
    this.manipulators.delete(name)
  }
  modifyLibrary (config) {
    const decorators = isEmpty(config.decorators)
      ? this.decorators
      : this.decorators.subset(config.decorators)
    const components = isEmpty(config.components)
      ? this.library.clone()
      : this.library.subset(config.components)
    const manipulators = isEmpty(config.manipulators)
      ? this.manipulators.clone()
      : this.manipulators.subset(config.manipulators)
    decorators.apply(components, config)
    return components
  }
  instance (config = {}) {
    const ReformedFormComposer = validate(
      reformed(config.middleware)(FormComposer)
    )
    return props => {
      const components = this.modifyLibrary(
        set(config, 'translator', props.translator)
      )
      this.manipulators.forEach(
        m => (props.elements = m.manipulate(props.elements))
      )
      return (
        <ReformedFormComposer library={components} {...props}>
          {props.children}
        </ReformedFormComposer>
      )
    }
  }
  editor (config = {}) {
    return props => {
      const components = this.modifyLibrary(
        set(config, 'translator', props.translator)
      )
      return (
        <FormEditor library={components} {...props}>
          {props.children}
        </FormEditor>
      )
    }
  }
}

export { EasyForm }
