import React from 'react'
import { FormFeedback } from 'reactstrap'
import { get, includes } from 'lodash'

const Validate = WrappedComponent => props => {
  if (get(props.errors, props.element.name)) {
    let { attributes, ...xProps } = props
    attributes = attributes || {}
    const { description } = props.element.schema
    attributes.invalid = true
    return (
      <>
        <WrappedComponent {...xProps} attributes={attributes} />
        {description ? <FormFeedback>{description}</FormFeedback> : null}
      </>
    )
  } else {
    return <WrappedComponent {...props} />
  }
}

const config = ({ translator, model }) => [
  {
    key: 'validate.divider',
    type: 'divider',
    layout: { col: { xs: 12 } }
  },
  {
    key: 'validate.infobox',
    type: 'infobox',
    label: '**Validation**',
    layout: { col: { xs: 12 } }
  },
  {
    key: 'validate.required',
    name: 'required',
    type: 'checkbox',
    label: 'Field is required',
    layout: { col: { xs: 12 } }
  }
]

const filter = key => !includes(['divider', 'infobox'], key)

export default Validate
export { config, filter }
