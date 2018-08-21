import React from 'react'

const AttributesDecorator = WrappedComponent => props => {
  const { getAttributes } = props
  if (typeof getAttributes != 'function') {
    throw new TypeError("Expected 'getAttributes' prop to be a function, did you set it?")
  }
  return <WrappedComponent {...props} attributes={getAttributes(props.element)} />
}

export { AttributesDecorator }
