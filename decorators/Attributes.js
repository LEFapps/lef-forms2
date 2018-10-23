import React from 'react'
import { includes } from 'lodash'

const AttributesDecorator = WrappedComponent => props => {
  const { getAttributes } = props
  if (typeof getAttributes !== 'function') {
    return <WrappedComponent {...props} />
  }
  return (
    <WrappedComponent {...props} attributes={getAttributes(props.element)} />
  )
}

const filter = key => !includes(['divider', 'infobox'], key)

export default AttributesDecorator
export { filter }
