import React from 'react'
import { Input } from 'reactstrap'
import { get, castArray } from 'lodash'

const GenericInput = ({ bindInput, element, attributes, children }) => {
  const { name, type, attributes: elementAttributes } = element
  if (get(elementAttributes, 'multiple', false)) {
    elementAttributes.value = castArray(elementAttributes.value)
  }
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

const config = () => [
  {
    key: 'input.divider',
    type: 'divider',
    layout: { col: { xs: '12' } }
  },
  {
    key: 'input',
    name: 'name',
    type: 'text',
    label: 'Field identifier',
    attributes: {
      placeholder: 'Technical name for field'
    },
    required: true,
    layout: { col: { xs: '12', sm: 6 } }
  },
  {
    key: 'input.placeholder',
    name: 'attributes.placeholder',
    type: 'text',
    label: 'Placeholder',
    layout: { col: { xs: '12', sm: 6 } }
  }
]

export default GenericInput
export { config, GenericInputNoChildren }
