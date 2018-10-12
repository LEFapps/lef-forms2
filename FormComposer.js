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
    return elements.map((element, key) => {
      if (isArray(element)) {
        return (
          <Row key={`row-${key}`}>
            {element.map(e => renderElements(e, library, additionalProps))}
          </Row>
        )
      } else return renderElements(element, library, additionalProps)
    })
  }
  render () {
    const { formAttributes } = this.props
    return (
      <Form onSubmit={this._onSubmit} {...formAttributes}>
        {this.renderElements(this.props)}
        {this.props.children}
      </Form>
    )
  }
}

export { FormComposer }
