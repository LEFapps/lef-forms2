import React from 'react'
import { get, set, filter } from 'lodash'

const Repeater = WrappedComponent => props => <WrappedComponent {...props} />

const manipulate = elements => {
  const repeaters = filter(elements, e => e.type == 'repeater')
  const repeatKeys = repeaters.map(r => r.name)
  const repeatOns = filter(elements, e =>
    includes(repeatKeys, get(e, 'repeats.on'))
  )
  console.log(repeaters, repeatOns)

  return elements
}

export default Repeater
