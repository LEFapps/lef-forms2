import React from 'react'
import GenericInput from './GenericInput'
import { zip, isArray } from 'lodash'

const Select = props => {
  const { element } = props
  const names = isArray(element.optionNames)
    ? element.optionNames
    : element.options
  const pairs = zip(names, element.options)
  if (get(element, 'attributes.multiple', false) == 'checkbox') {
    return <SelectMulti {...props} />
  } else {
    return (
      <GenericInput {...props}>
        <option key={`${element.name}-option-default`}>{'–'}</option>
        {pairs.map((option, i) => (
          <option key={`${element.name}-option-${i}`} value={option[1]}>
            {option[0]}
          </option>
        ))}
      </GenericInput>
    )
  }
}

const config = () => [
  {
    key: 'select',
    name: 'name',
    type: 'text',
    label: 'Field identifier',
    attributes: {
      placeholder: 'Technical name for field'
    },
    required: true,
    layout: { col: { xs: 12, md: 4 } }
  },
  {
    key: 'select.optionNames',
    name: 'optionNames',
    type: 'textarea',
    label: 'Values',
    layout: { col: { xs: 12, md: 8 } },
    attributes: {
      rows: 8,
      placeholder: 'one\nitem\nper\nline',
      style: { whiteSpace: 'nowrap' }
    },
    required: true
  }
]

export default Select

export { config }
