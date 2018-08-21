import React from 'react'
import { FormGroup, Label } from 'reactstrap'

const FormGroupDecorator = WrappedComponent => props => ( 
  <FormGroup>
    {props.element.label?<Label for={props.element.name}>{props.element.label}</Label>:null}
    <WrappedComponent {...props} />
  </FormGroup>
)

export { FormGroupDecorator }
