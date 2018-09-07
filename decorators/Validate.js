import React from 'react'
import { FormFeedback } from 'reactstrap'
import { get } from 'lodash'

const Validate = WrappedComponent => props => {
  if (get(props.errors, props.element.name)) {
    let { attributes, ...xProps } = props
    attributes = attributes || {}
    const { description } = props.element.schema
    attributes.invalid = true
    return (
      <>
        <WrappedComponent {...xProps} attributes={attributes} />
        { description ? <FormFeedback>{description}</FormFeedback> : null }
      </>
    )
  } else {
    return <WrappedComponent {...props} />
  }
}

const config = [
  {
    name: 'required',
    type: 'checkbox',
    label: 'Required',
    layout: { col: { md: 12 } }
  }
]

export default Validate
export { config }
