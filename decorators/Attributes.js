import React from 'react'

const AttributesDecorator = WrappedComponent => props => {
  const { getAttributes } = props
  if (typeof getAttributes !== 'function') {
    return <WrappedComponent {...props} />
  }
  return <WrappedComponent {...props} attributes={getAttributes(props.element)} />
}

export default AttributesDecorator
