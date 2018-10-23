import React from 'react'
import { Input } from 'reactstrap'

const TextComponent = props => {
  const { bindInput, element, attributes: propsAttributes } = props
  const { name, type, attributes: elementAttributes } = element
  return (
    <Input
      type={type}
      {...bindInput(name)}
      {...elementAttributes}
      {...propsAttributes}
    />
  )
}

const config = [
  {
    key: 'text',
    name: 'name',
    type: 'text',
    label: 'Field identifier',
    attributes: {
      placeholder: 'Technical name for field'
    },
    required: true,
    layout: { col: { xs: 12, sm: 6 } }
  },
  {
    key: 'text.placeholder',
    name: 'attributes.placeholder',
    type: 'text',
    label: 'Placeholder',
    layout: { col: { xs: '12', sm: 6 } }
  }
]

export default TextComponent
export { config }
