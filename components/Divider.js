import React from 'react'

const DividerComponent = props => {
  const { bindInput, element, attributes: propsAttributes } = props
  const { attributes: elementAttributes } = element
  return <hr {...elementAttributes} {...propsAttributes} />
}

const config = [
  {
    key: 'divider',
    name: 'divider',
    type: 'select',
    label: 'Divider type',
    options: ['', 'hr'],
    optionNames: ['-', 'Ruler'],
    layout: {
      col: {
        sm: 6
      }
    }
  }
]

export default DividerComponent
export { config }
