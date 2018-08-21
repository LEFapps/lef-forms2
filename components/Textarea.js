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
      <Input name={name} type={type}  {...bindInput(name)} {...elementAttributes} {...propsAttributes} />      
    )
  }
}
  
export default Textarea
