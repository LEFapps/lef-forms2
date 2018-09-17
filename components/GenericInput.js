import React from 'react'
import { Input } from 'reactstrap'

const GenericInput = ({ bindInput, element, attributes, children }) => {
  const { name, type, attributes: elementAttributes } = element
  return (
    <Input
      type={type}
      {...bindInput(name)}
      {...elementAttributes}
      {...attributes}
    >
      {children}
    </Input>
  )
}

const GenericInputNoChildren = ({ bindInput, element, attributes }) => {
  const { name, type, attributes: elementAttributes } = element
  return (
    <Input
      type={type}
      {...bindInput(name)}
      {...elementAttributes}
      {...attributes}
    />
  )
}

GenericInput.displayName = 'Input'
GenericInputNoChildren.displayName = 'Input'

const config = [
  {
    name: 'name',
    type: 'text',
    label: 'Field name',
    attributes: {
      placeholder: 'Technical name for field'
    },
    validation: { required: true },
    layout: { col: { md: '12' } }
  },
  {
    name: 'attributes.placeholder',
    type: 'text',
    label: 'Placeholder',
    layout: { col: { md: '12' } }
  }
]

export default GenericInput
export { config, GenericInputNoChildren }
