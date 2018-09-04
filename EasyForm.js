import React, { Component } from 'react'
import reformed from './reformed'
import { applyDecorators } from './helpers'
import ComponentLibrary from './Components'
import DecoratorLibrary from './Decorators'
import { FormComposer } from './FormComposer'
import { has, set,get, defaults } from 'lodash'

const EasyForm = {
  library: ComponentLibrary,
  decorators: DecoratorLibrary,
  addComponent(name,component) {
    if (EasyForm.library.has(name))
      console.log(`Warning: Replacing default ${name} component`)
    EasyForm.library.set(name,component)
  },
  addDecorator(name,decorator) {
    if (EasyForm.decorators.has(name))
      console.log(`Warning: Replacing default ${name} decorator`)
    EasyForm.decorators.set(name,decorator)
  },
  configure(config = {}) {
    defaults(config,{
      decorators: []
    })
    decorators = EasyForm.decorators.subset(config.decorators)    
    applyDecorators(decorators,EasyForm.library)
    return EasyForm.instance(config.middleware)
  },
  fullConfiguration(config = {}) {
    defaults(config,{ decorators: DecoratorLibrary.keys() })
    return EasyForm.configure(config)
  },
  instance(middleware) {
    const ReformedFormComposer = reformed(middleware)(FormComposer)
    return (props) => {
      return <ReformedFormComposer library={EasyForm.library} {...props} />
    }
  }
}

const EasyFormEditor = {
    
}

export { EasyForm }
