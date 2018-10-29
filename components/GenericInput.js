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

const config = ({ translator, model }) => []

export default GenericInput
export { config, GenericInputNoChildren }
