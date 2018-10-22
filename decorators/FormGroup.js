import React from 'react'
import { FormGroup, Label } from 'reactstrap'
import { includes, union, flip } from 'lodash'

const FormGroupDecorator = WrappedComponent => props => {
  if (includes(['radio', 'checkbox'], props.element.type)) {
    const { label } = props.element || ''
    return (
      <FormGroup check>
        <Label for={props.element.name} check>
          <WrappedComponent {...props} />
          {label}
        </Label>
      </FormGroup>
    )
  } else {
    return (
      <FormGroup>
        {props.element.label ? (
          <Label for={props.element.name}>{props.element.label}</Label>
        ) : null}
        <WrappedComponent {...props} />
      </FormGroup>
    )
  }
}

const config = [
  {
    name: 'label',
    type: 'textarea',
    label: 'Field label or introduction',
    layout: { col: { xs: '12' } }
  }
]

// Configuration of label is put in front
const combine = flip(union)

export default FormGroupDecorator
export { config, combine }
