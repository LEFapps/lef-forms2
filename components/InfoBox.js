import React from 'react'
import { Text } from 'meteor/lef:utils'
import { translatorText } from '../translator'

import { upperCase } from 'lodash'

const InfoBoxComponent = props => {
  const { translator, bindInput, element, attributes: propsAttributes } = props
  const { attributes: elementAttributes } = element
  return (
    <div {...elementAttributes} {...propsAttributes}>
      <Text content={translatorText(element.label, translator)} />
    </div>
  )
}

const config = ({ translator, model }) => {
  const { languages } = translator || {}
  if (languages) {
    return languages.map(language => ({
      key: 'infobox.' + language,
      name: 'label.' + language,
      type: 'textarea',
      label: upperCase(language),
      layout: { col: { xs: 12 } },
      attributes: { rows: 4 }
    }))
  } else {
    return [
      {
        name: 'label',
        type: 'textarea',
        key: 'infobox',
        label: 'Text contents',
        attributes: { rows: 5 },
        layout: { col: { xs: 12 } }
      }
    ]
  }
}

export default InfoBoxComponent
export { config }
