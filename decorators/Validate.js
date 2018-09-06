import React from 'react'
import { FormFeedback } from 'reactstrap'
import { get } from 'lodash'

const Validate = WrappedComponent => props => {
  if (get(props.errors, props.element.name)) {
    let { attributes, ...xProps } = props
    attributes = attributes || {}
    const { feedback } = props.element.validate
    attributes.invalid = true
    return (
      <>
        <WrappedComponent {...xProps} attributes={attributes} />
        { feedback ? <FormFeedback>{feedback}</FormFeedback> : null }
      </>
    )
  } else {
    return <WrappedComponent {...props} />
  }
}

export default Validate
