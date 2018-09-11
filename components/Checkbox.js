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

const config = [
  {
    name: 'name',
    type: 'text',
    label: 'Field name',
    validation: { required: true },
    layout: { col: { md: '12' } }
  },
  {
    name: 'value',
    type: 'text',
    label: 'Value',
    layout: { col: { md: '12' } }
  }
]

export default Checkbox
export { config }
