import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Select, { transformOptions } from './Select'
import {
  map,
  forEach,
  reduce,
  upperCase,
  upperFirst,
  kebabCase,
  get,
  find,
  includes,
  stubTrue,
  cloneDeep,
  assign,
  size,
  isString,
  isArray,
  isPlainObject
} from 'lodash'

const collections = () => window.myCollections || []

const SelectWrapper = props => {
  if (props.loading) return null
  return <Select {...props} />
}

const SelectContainer = withTracker(({ element, translator }) => {
  const { subscription, fields, defaultOptions } = element
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
  if (isArray(fields) && fields.length) {
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
    element: assign(cloneDeep(element), {
      options: (isArray(defaultOptions) ? defaultOptions : []).concat(
        size(documents)
          ? documents.map(d => ({
            _id: d._id,
            default: isArray(fields)
                ? fields.map(f => get(d, f, '…')).join(' • ')
                : d._id
          }))
          : []
      ),
      fields: fields,
      type: 'select'
    })
  }
})(SelectWrapper)

const config = ({ translator, model }) => {
  const headerElements = [
    {
      key: 'select.divider',
      type: 'divider',
      layout: { col: { xs: '12' } }
    },
    {
      key: 'select.subscription',
      name: 'subscription',
      type: 'select',
      label: 'Collection from which items can be selected',
      required: true,
      options: map(collections(), c => ({
        _id: c.subscription,
        default: upperFirst(c.subscription)
      })),
      layout: { col: { xs: 12, md: 6 } }
    }
  ]
  const extraElements =
    translator && translator.languages
      ? [
        {
          key: 'select.infobox',
          type: 'infobox',
          label: {
            nl: '**Opties**',
            fr: '**Choix**',
            en: '**Options**'
          },
          layout: { col: { xs: 12 } }
        }
      ].concat(
          translator.languages.map(language => ({
            key: 'select.options.' + language,
            name: 'defaultOptions.' + language,
            type: 'textarea',
            label: upperCase(language),
            layout: {
              col: {
                xs: Math.max(3, Math.round(12 / translator.languages.length))
              }
            },
            attributes: {
              rows: 3,
              placeholders: {
                nl: 'Eén optie per lijn',
                fr: 'one item per line',
                en: 'one item per line'
              },
              style: { whiteSpace: 'nowrap' }
            }
          }))
        )
      : [
        {
          key: 'select.options',
          name: 'defaultOptions',
          type: 'textarea',
          label: {
            nl: 'Bijkomende opties',
            fr: 'Extra values',
            en: 'Extra values'
          },
          layout: { col: { xs: 12 } },
          attributes: {
            rows: 3,
            placeholders: {
              nl: 'Eén optie per lijn',
              fr: 'one item per line',
              en: 'one item per line'
            },
            style: { whiteSpace: 'nowrap' }
          }
        }
      ]
  const collectionElements = [
    {
      key: 'select.fields',
      name: 'fields',
      type: 'textarea',
      label: {
        nl: 'Lijsteigenschappen die als optie getoond worden',
        fr: 'Fields to generate a name from',
        en: 'Fields to generate a name from'
      },
      layout: { col: { xs: 12, sm: 6 } },
      attributes: {
        rows: 3,
        placeholders: {
          nl: 'Eén optie per lijn',
          fr: 'One item per line',
          en: 'One item per line'
        },
        style: { whiteSpace: 'nowrap' }
      }
    }
  ]
  return headerElements.concat(extraElements.concat(collectionElements))
}

/* Transformation of options
 * To make it easier to fill options (newlines in textarea),
 * these need to be transformed before saving or retrieving.
 */

const transform = (element, { translator }, saving) => {
  if (element.defaultOptions) {
    element.defaultOptions = transformOptions(
      element.defaultOptions,
      translator || {},
      saving
    )
  }
  if (element.fields) {
    element.fields = saving
      ? isString(element.fields)
        ? (element.fields || '').split('\n')
        : element.fields
      : isArray(element.fields)
        ? (element.fields || []).join('\n')
        : element.fields
  }
  return element
}

export default SelectContainer
export { config, transform }
