import React from 'react'
import { Col } from 'reactstrap'

const LayoutDecorator = WrappedComponent => props => {
  if (props.element.layout) {
    return (
      <Col {...props.element.layout.col}>
        <WrappedComponent {...props} />
      </Col>
    )
  } else {
    return <WrappedComponent {...props} />
  }
}

const config = [
  [
    {
      name: 'layout.col.md',
      type: 'select',
      label: 'Column width',
      options: ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      optionNames: [
        'Auto',
        '10 %',
        '15 %',
        '25 %',
        '30 %',
        '40 %',
        '50 %',
        '60 %',
        '70 %',
        '75 %',
        '85 %',
        '90 %',
        '100 %'
      ],
      layout: { col: { md: '6' } }
    }
  ]
]

export default LayoutDecorator
export { config }
