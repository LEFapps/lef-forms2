import React from 'react'
import { Col } from 'reactstrap'

const LayoutDecorator = WrappedComponent => props => {
  if (props.element.layout) {
    return <Col {...props.element.layout.col}>
      <WrappedComponent {...props} />
    </Col>
  } else {
    return <WrappedComponent {...props} />
  }
}

const config = [
  {
    name: 'layout.col.md',
    type: 'text',
    label: 'Column width',
    layout: { col: { md: '6' } }
  }
]

export default LayoutDecorator
export { config }
