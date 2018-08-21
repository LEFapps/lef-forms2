import React, { Component } from 'react'
import { Form } from 'reactstrap'
import { map } from 'lodash'
import reformed from 'react-reformed'

class FormComposer extends Component {
  constructor(props) {
    super(props);
  }
  _onSubmit = (e)=> {
    e.preventDefault()
    this.props.onSubmit(this.props.model)
  }
  renderElements(props) {
    const { elements,components, ...additionalProps } = props
    return map(elements, element => {
      if (components.hasOwnProperty(element.type)) {
        let Component = components[element.type];
        return <Component key={element.name} element={element} {...additionalProps} />
      } else {
        console.log(`Unknown element type: ${element.type}`)
        return null;
      }
    })
  }
  render() {
    return (
      <Form onSubmit={this._onSubmit}>
        {this.renderElements(this.props)}
        {this.props.children}
      </Form>
    )
  }
}

const ReformedFormComposer = reformed()(FormComposer)

export { ReformedFormComposer as FormComposer }
