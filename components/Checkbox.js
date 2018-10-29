import React from 'react'
import { GenericInputNoChildren } from './GenericInput'
import { get, upperCase, kebabCase } from 'lodash'
import { translatorText } from '../translator'

const Checkbox = props => {
  const { bindInput, ...xProps } = props
  const bindCheckedInput = name => {
    return {
      name,
      checked: get(props.model, name),
      onChange: e => props.setProperty(name, e.target.checked)
    }
  }
  if (get(xProps, 'value', '')) {
    xProps.value = translatorText(xProps.value, translator)
  }
  return <GenericInputNoChildren {...xProps} bindInput={bindCheckedInput} />
}

Checkbox.displayName = 'Checkbox'

const config = ({ translator, model }) => []
const transform = (element, translator, saving) => {
  return `~${kebabCase(translatorText(element.label, translator, true))}`
}

export default Checkbox
export { transform }
