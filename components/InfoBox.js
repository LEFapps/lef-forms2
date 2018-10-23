import React from 'react'
import { Text } from 'meteor/lef:utils'

const InfoBoxComponent = props => {
  const { bindInput, element, attributes: propsAttributes } = props
  const { attributes: elementAttributes } = element
  return (
    <div {...elementAttributes} {...propsAttributes}>
      <Text content={element.infobox} />
    </div>
  )
}

const config = [
  {
    name: 'infobox',
    type: 'textarea',
    key: 'infobox',
    label: 'Text contents',
    attributes: {
      rows: 5
    },
    layout: {
      col: { xs: 12 }
    }
  }
]

export default InfoBoxComponent
export { config }
