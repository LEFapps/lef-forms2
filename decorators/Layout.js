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

const layout = { col: { md: '3', sm: '6', xs: '12' } }
const options = ['', 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
const optionNames = [
  'Fill remaining space',
  '12 / 12 (full width)',
  '11 / 12',
  '10 / 12',
  '9 / 12 (three quarters)',
  '8 / 12 (two thirds)',
  '7 / 12',
  '6 / 12 (half)',
  '5 / 12',
  '4 / 12 (third)',
  '3 / 12 (quarter)',
  '2 / 12',
  '1 / 12'
]

const config = [
  {
    name: 'layout.col.xs',
    type: 'select',
    label: 'Column width: Phone',
    options,
    optionNames,
    layout
  },
  {
    name: 'layout.col.sm',
    type: 'select',
    label: 'Tablet',
    options,
    optionNames,
    layout
  },
  {
    name: 'layout.col.md',
    type: 'select',
    label: 'Laptop',
    options,
    optionNames,
    layout
  },
  {
    name: 'layout.col.lg',
    type: 'select',
    label: 'Desktop',
    options,
    optionNames,
    layout
  }
]

export default LayoutDecorator
export { config }
