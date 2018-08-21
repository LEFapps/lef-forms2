import React, { Component } from 'react'
import reformed from 'react-reformed'
import { Input } from 'reactstrap'

class Textarea extends Component {
  get type() {
    return "textarea"
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
        validation: { required: true }
      },
      {
        name: "label",
        type: "textarea",
        label: "Label"
      },
      {
        name: "attributes.rows",
        type: "text",
        label: "Number of rows"
      }
]

export default Textarea
export { config }
