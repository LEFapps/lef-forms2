import React from 'react'
import { FormGroup, Label } from 'reactstrap'
import { includes, union, flip, size } from 'lodash'
import { Text } from 'meteor/lef:utils'
import { Translate } from 'meteor/lef:translations'

const FormGroupDecorator = WrappedComponent => props => {
  const { label } = props.element || ''
  const labelProps = {}
  if (label && label.translate) {
    labelProps._id = label.translate
    if (label.category) labelProps.category = label.category
    if (label.md) labelProps.md = true
  }
  if (includes(['radio', 'checkbox'], props.element.type)) {
    return (
      <FormGroup check>
        <Label for={props.element.name} check>
          <WrappedComponent {...props} />
          {size(labelProps) ? (
            <Translate {...labelProps} />
          ) : (
            <Text content={label} />
          )}
        </Label>
      </FormGroup>
    )
  } else {
    return (
      <FormGroup>
        {props.element.label ? (
          <Label for={props.element.name}>
            {size(labelProps) ? <Translate {...labelProps} /> : label}
          </Label>
        ) : null}
        <WrappedComponent {...props} />
      </FormGroup>
    )
  }
}

const config = () => [
  {
    key: 'label',
    name: 'label',
    type: 'textarea',
    label: 'Field label or introduction',
    layout: { col: { xs: '12' } },
    attributes: {
      rows: 2
    },
  }
]

// Configuration of label is put in front
const combine = flip(union)

const filter = key => !includes(['divider', 'infobox'], key)

export default FormGroupDecorator
export { config, combine, filter }
