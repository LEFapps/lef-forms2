import React from 'react'
import { FormGroup, Label } from 'reactstrap'
import { map,union,flip } from 'lodash'

const FormGroupDecorator = WrappedComponent => props => ( 
  <FormGroup>
    {props.element.label?<Label for={props.element.name}>{props.element.label}</Label>:null}
    <WrappedComponent {...props} />
  </FormGroup>
)

const config = [
  {
    name: "label",
    type: "textarea",
    label: "Field label or introduction",
    layout: {col: {md:"12"}}
  }
]

// Configuration of label is put in front
const combine = flip(union)

export default FormGroupDecorator
export { config, combine }
