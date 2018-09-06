import React from 'react'
import GenericInput from './GenericInput'
import { zip, isArray } from 'lodash'

const Select = props => {
  const { element } = props
  const names = isArray(element.optionNames) ? element.optionNames : element.options
  const pairs = zip(names, element.options)
  return (
    <GenericInput {...props}>
      { pairs.map((option, i) => <option key={`${element.name}-option-${i}`} value={option[1]}>{option[0]}</option>)}
    </GenericInput>
  )
}

export default Select
