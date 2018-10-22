import React from 'react'
import GenericInput from './GenericInput'
import { zip, isArray } from 'lodash'

const Select = props => {
  const { element } = props
  const names = isArray(element.optionNames)
    ? element.optionNames
    : element.options
  const pairs = zip(names, element.options)
  return (
    <GenericInput {...props}>
      {pairs.map((option, i) => (
        <option key={`${element.name}-option-${i}`} value={option[1]}>
          {option[0]}
        </option>
      ))}
    </GenericInput>
  )
}

const config = [
  {
    name: 'name',
    type: 'text',
    label: 'Field identifier',
    attributes: {
      placeholder: 'Technical name for field'
    },
    required: true,
    layout: { col: { xs: 12 } }
  },
  {
    name: 'options',
    type: 'textarea',
    label: 'Values in background',
    layout: { col: { xs: 6 } },
    attributes: {
      rows: 5,
      placeholder: 'one item per line',
      style: { whiteSpace: 'nowrap' }
    },
    required: true
  },
  {
    name: 'optionNames',
    type: 'textarea',
    label: 'Display names for Values',
    layout: { col: { xs: 6 } },
    attributes: {
      rows: 5,
      placeholder: 'one item per line',
      style: { whiteSpace: 'nowrap' }
    },
    required: true
  }
]

export default Select

export { config }
