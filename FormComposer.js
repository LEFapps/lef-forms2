import React, { Component } from 'react'
import { Form, Row } from 'reactstrap'
import { map, isArray } from 'lodash'

const renderElements = (element, library, additionalProps) => {
  if (library.has(element.type)) {
    let Component = library.get(element.type).component
    return (
      <Component
        key={`${element.name}${element.key || ''}`}
        element={element}
        {...additionalProps}
      />
    )
  } else {
    console.log(`Unknown element type: ${element.type}`)
    return null
  }
}

class FormComposer extends Component {
  constructor (props) {
    super(props)
    this._onSubmit = this._onSubmit.bind(this)
  }
  _onSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.props.model)
  }
  renderElements (props) {
    const { elements, library, ...additionalProps } = props
    return elements.map((element, key) =>
      renderElements(element, library, additionalProps)
    )
  }
  render () {
    const { formAttributes } = this.props
    return (
      <Form onSubmit={this._onSubmit} {...formAttributes}>
        <Row>{this.renderElements(this.props)}</Row>
        {this.props.children}
      </Form>
    )
  }
}

export { FormComposer }
