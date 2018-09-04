import React, { Component } from 'react'
import reformed from 'react-reformed'
import { Input } from 'reactstrap'

class TextComponent extends Component {
  get type() {
    return "text"
  }
  render() {
    const { bindInput, element, attributes: propsAttributes } = this.props
    const { name, type, attributes: elementAttributes } = element
    return (
      <Input type={type}  {...bindInput(name)} {...elementAttributes} {...propsAttributes} />      
    )
  }
}
  
const config = [
      {
        name: "name",
        type: "text",
        label: "Field name",
        attributes: {
          placeholder: "Technical name for field"
        },
        validation: { required: true },
        layout: {col: {md:"12"}},
      },
      {
        name: "attributes.placeholder",
        type: "text",
        label: "Placeholder",
        layout: {col: { md:"12" }}
      }
]

export default TextComponent
export { config }
