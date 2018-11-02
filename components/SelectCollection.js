import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import Select, { transformOptions } from './Select'
import collectionWrapper, {
  collectionHeader,
  collectionElements
} from '../editor/collectionWrapper'
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

const SelectWrapper = props => {
  if (props.loading) return null
  return <Select {...props} />
}

const SelectCollection = collectionWrapper(SelectWrapper)

const config = ({ translator, model }) => {
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
  return collectionHeader().concat(extraElements.concat(collectionElements()))
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

export default SelectCollection
export { config, transform }