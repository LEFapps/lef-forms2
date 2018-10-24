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

const config = () => [
  {
    key: 'validate',
    type: 'divider',
    layout: { col: { xs: 12 } }
  },
  {
    key: 'validate.required',
    name: 'required',
    type: 'checkbox',
    label: 'Required',
    layout: { col: { xs: 12 } }
  }
]

const filter = key => !includes(['divider', 'infobox'], key)

export default Validate
export { config, filter }
