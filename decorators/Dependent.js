import React from 'react'
import {
  get,
  isEmpty,
  isUndefined,
  isArray,
  castArray,
  intersection
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
  [
    {
      name: 'dependent.on',
      type: 'text',
      label: 'Dependent on field:',
      layout: { col: { md: '4' } }
    },
    {
      name: 'dependent.operator',
      type: 'select',
      label: 'Dependency operator',
      layout: { col: { md: '2' } },
      dependent: { on: 'dependent.on' }, // oh yes :)
      options: ['', 'in', 'gt', 'gte', 'lt', 'lte', 'is', 'isnt'],
      optionNames: [
        'Geen',
        'field(s) in [value(s)]',
        'source > [value]',
        'source ≥ {value]',
        'source < [value]',
        'source ≤ [value]',
        'source IS [value]',
        'source IS NOT [value]'
      ]
    },
    {
      name: 'dependent.values',
      type: 'text',
      label: 'Dependency value',
      layout: { col: { md: '6' } },
      dependent: { on: 'dependent.operator', operator: 'isnt', values: '' },
      attributes: {
        placeholder: 'Leave blank if value does not matter'
      }
    }
  ]
]

export default Dependent
export { config }
