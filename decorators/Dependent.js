import React from 'react'
import {
  get,
  isEmpty,
  isUndefined,
  castArray,
  intersection,
  includes
} from 'lodash'

const dependency = ({ on, operator, values }) => model => {
  const value = get(model, on)
  if (isUndefined(operator) && isUndefined(values)) return !isEmpty(value)
  else if (operator === 'is' || isUndefined(operator)) {
    if (isEmpty(values)) return isEmpty(value)
    else return !isEmpty(intersection(castArray(value), castArray(values)))
  } else {
    switch (operator) {
      case 'in':
        return !isEmpty(intersection(castArray(value), castArray(values)))
        break
      case 'gt':
        return values > value
        break
      case 'gte':
        return values >= value
        break
      case 'lt':
        return values < value
        break
      case 'lte':
        return values <= value
        break
      case 'is':
        return values == value
        break
      case 'isnt':
        return values != value
        break
      default:
        return !isEmpty(value)
    }
  }
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
    key: 'dependent',
    type: 'divider',
    layout: { col: { xs: 12 } }
  },
  {
    key: 'dependent.on',
    name: 'dependent.on',
    type: 'text',
    label: 'Dependent on field:',
    attributes: {
      placeholder: 'Field identifier'
    },
    layout: { col: { xs: 12, sm: 12, md: '4' } }
  },
  {
    key: 'dependent.operator',
    name: 'dependent.operator',
    type: 'select',
    label: 'Dependency operator',
    layout: { col: { xs: 12, sm: 5, md: '3' } },
    dependent: { on: 'dependent.on' }, // oh yes :)
    options: ['', 'in', 'gt', 'gte', 'lt', 'lte', 'is', 'isnt'],
    optionNames: [
      'None',
      'Field in [value(s)]',
      'Source > [value]',
      'Source ≥ {value]',
      'Source < [value]',
      'Source ≤ [value]',
      'Source IS [value]',
      'Source IS NOT [value]'
    ]
  },
  {
    key: 'dependent.values',
    name: 'dependent.values',
    type: 'text',
    label: 'Dependency value',
    layout: { col: { xs: 12, sm: 7, md: '5' } },
    dependent: {
      on: 'dependent.operator',
      operator: 'in',
      values: ['in', 'gt', 'gte', 'lt', 'lte', 'is', 'isnt']
    },
    attributes: {
      placeholder: 'Blank unless value matters'
    }
  }
]

const filter = key => !includes([], key)

export default Dependent
export { config }
