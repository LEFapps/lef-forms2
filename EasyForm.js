import React, { Component } from 'react'
import reformed from './reformed'
import { applyDecorators } from './helpers'
import ComponentLibrary from './Components'
import DecoratorLibrary from './Decorators'
import { FormComposer } from './FormComposer'
import { FormEditor } from './FormEditor'
import { has, set, get, defaults, isEmpty } from 'lodash'

class EasyForm {
  constructor({library = ComponentLibrary, decorators = DecoratorLibrary}={}) {
    this.library = library
    this.decorators = decorators
  }
  addComponent(name,component) {
    if (this.library.has(name))
      console.log(`Warning: Replacing default ${name} component`)
    this.library.set(name,component)
  }
  removeComponent(name) {
    this.library.delete(name)
  }
  addDecorator(name,decorator) {
    if (this.decorators.has(name))
      console.log(`Warning: Replacing default ${name} decorator`)
    this.decorators.set(name,decorator)
  }
  removeDecorator(name) {
    this.decorators.delete(name)
  }
  modifyLibrary(config) {
    decorators = isEmpty(config.decorators) ? this.decorators : this.decorators.subset(config.decorators)
    components = isEmpty(config.components) ? this.library.clone() : this.library.subset(config.components)
    decorators.apply(components)
    return components
  }
  instance(config = {}) {
    components = this.modifyLibrary(config)
    const ReformedFormComposer = reformed(config.middleware)(FormComposer)
    return (props) => {
      return <ReformedFormComposer library={components} {...props}>
        {props.children}
      </ReformedFormComposer>
    }
  }
  editor(config = {}) {
    components = this.modifyLibrary(config)
    return (props) => {
      return <FormEditor library={components} {...props}>
        {props.children}
      </FormEditor>
    }
  }
}

export { EasyForm }
