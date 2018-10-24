import React from 'react'
import { GenericInputNoChildren } from './GenericInput'
import { get } from 'lodash'

const Checkbox = props => {
  const { bindInput, ...xProps } = props
  const bindCheckedInput = name => {
    return {
      name,
      checked: get(props.model, name),
      onChange: e => props.setProperty(name, e.target.checked)
    }
  }
  return <GenericInputNoChildren {...xProps} bindInput={bindCheckedInput} />
}

Checkbox.displayName = 'Checkbox'

const config = () => [
  {
    key: 'checkbox',
    name: 'name',
    type: 'text',
    label: 'Field identifier',
    attributes: {
      placeholder: 'Technical name for field'
    },
    required: true,
    layout: { col: { xs: '12', sm: 8 } }
  },
  {
    key: 'checkbox.value',
    name: 'value',
    type: 'text',
    label: 'Value',
    layout: { col: { xs: '12', sm: 4 } }
  }
]

export default Checkbox
export { config }
