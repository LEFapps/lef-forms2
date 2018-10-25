import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Select from './Select'
import { map, upperFirst, get, find, stubTrue, assign, size } from 'lodash'

const collections = () => window.myCollections || []

const SelectWrapper = props => {
  if (props.loading) return false
  return <Select {...props} />
}

const SelectContainer = withTracker(({ element }) => {
  const { subscription, fields, defaultOptions, defaultOptionNames } = element
  const coll = find(collections(), c => c.subscription == subscription)
  if (subscription && !coll) {
    console.warn(
      `“${subscription}” not found. Make sure your collections are declared globally. See documentation for more information.`
    )
  }
  const handle = coll
    ? Meteor.subscribe(coll.subscription)
    : { ready: stubTrue }
  const collOptions = {}
  if (size(fields)) {
    collOptions.fields = {}
    fields.forEach(f => (collOptions.fields[f] = 1))
    collOptions.sort = { [fields[0]]: 1 }
  }
  const documents = coll
    ? coll.collection
        .find({}, size(collOptions) ? collOptions : undefined)
        .fetch()
    : []
  return {
    loading: !handle.ready(),
    element: assign(element, {
      options: defaultOptions.concat(
        size(documents) ? documents.map(d => d._id) : []
      ),
      optionNames: defaultOptionNames.concat(
        size(documents)
          ? documents.map(
              d =>
                size(fields)
                  ? fields.map(f => get(d, f, '…')).join(' — ')
                  : d._id
            )
          : []
      ),
      fields: fields,
      type: 'select'
    })
  }
})(SelectWrapper)

const config = () => [
  {
    key: 'select.divider',
    type: 'divider',
    layout: { col: { xs: '12' } }
  },
  {
    key: 'select',
    name: 'name',
    type: 'text',
    label: 'Field identifier',
    attributes: {
      placeholder: 'Technical name for field'
    },
    required: true,
    layout: { col: { xs: 12, md: 6 } }
  },
  {
    key: 'select.subscription',
    name: 'subscription',
    type: 'select',
    label: 'Collection from which items can be selected',
    required: true,
    options: map(collections(), c => c.subscription),
    optionNames: map(collections(), c => upperFirst(c.subscription)),
    layout: { col: { xs: 12, md: 6 } }
  },
  {
    key: 'select.optionNames',
    name: 'defaultOptionNames',
    type: 'textarea',
    label: 'Extra values',
    layout: { col: { xs: 12, sm: 6 } },
    attributes: {
      rows: 8,
      placeholder: 'one\nitem\nper\nline',
      style: { whiteSpace: 'nowrap' }
    }
  },
  {
    key: 'select.fields',
    name: 'fields',
    type: 'textarea',
    label: 'Fields to generate a name from',
    layout: { col: { xs: 12, sm: 6 } },
    attributes: {
      rows: 8,
      placeholder: 'one\nitem\nper\nline',
      style: { whiteSpace: 'nowrap' }
    }
  }
]

export default SelectContainer
export { config }
