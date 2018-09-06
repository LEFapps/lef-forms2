import React from 'react'
import { isEmpty, get } from 'lodash'

const dependency = config => model => {
  return !isEmpty(get(model, config.on))
}

const Dependent = WrappedComponent => props => {
  if (props.element.dependent) {
    if (!dependency(props.element.dependent)(props.model)) {
      return null
    }
  }
  return <WrappedComponent {...props} />
}

const config = [
  {
    name: 'dependent.on',
    type: 'text',
    label: 'Dependent on field:',
    layout: { col: { md: '6' } }
  },
  {
    name: 'dependent.operator',
    type: 'text',
    layout: { col: { md: '6' } },
    dependent: { on: 'dependent.on' } // oh yes :)
  }
]

export default Dependent
export { config }
