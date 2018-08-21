import React, { Component } from 'react'
import { FormComposer } from './FormComposer'

class ElementEditor extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    const { element, components, componentConfiguration } = this.props
    console.log(componentConfiguration)
    const elements = componentConfiguration[element.type]
    return (
      <FormComposer 
        components={components}
        elements={elements}
        initialModel={element} 
      />
    )
  }
}
// const configuration
//

export { ElementEditor }
