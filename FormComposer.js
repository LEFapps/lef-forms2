import React, { Component } from 'react'
import { Form } from 'reactstrap'
import { map } from 'lodash'

class FormComposer extends Component {
  constructor(props) {
    super(props);
  }
  _onSubmit = (e)=> {
    e.preventDefault()
    this.props.onSubmit(this.props.model)
  }
  renderElements(props) {
    const { elements,library, ...additionalProps } = props
    return map(elements, element => {
      if (library.has(element.type)) {
        let Component = library.get(element.type).component;
        return <Component key={element.name} element={element} {...additionalProps} />
      } else {
        console.log(`Unknown element type: ${element.type}`)
        return null;
      }
    })
  }
  render() {
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
