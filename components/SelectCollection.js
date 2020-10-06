import React from 'react'
import { Select, transformOptions } from '@lefapps/forms'
import collectionWrapper, {
  collectionHeader,
  collectionElements
} from './collectionWrapper.js'
import { isArray, isString, stubFalse, upperCase } from 'lodash'

const SelectWrapper = props => {
  if (props.loading) return null
  return <Select {...props} />
}

const SelectCollection = collectionWrapper(SelectWrapper)

SelectCollection.displayName = 'SelectCollection'

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
          [
            {
              key: 'select.options._id',
              name: 'options._id',
              type: 'textarea',
              label: 'ID (~value)',
              layout: {
                col: {
                  xs: Math.max(
                    3,
                    Math.round(12 / (translator.languages.length + 1))
                  )
                }
              },
              attributes: {
                rows: 3,
                placeholders: {
                  nl: 'Eén optie per lijn',
                  fr: 'One item per line',
                  en: 'One item per line'
                },
                style: { whiteSpace: 'nowrap' }
              },
              required: true
            }
          ].concat(
            translator.languages.map(language => ({
              key: 'select.options.' + language,
              name: 'defaultOptions.' + language,
              type: 'textarea',
              label: upperCase(language),
              layout: {
                col: {
                  xs: Math.max(
                    3,
                    Math.round(12 / (translator.languages.length + 1))
                  )
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

const filter = stubFalse
const hideable = true

export { SelectCollection as component, config, transform, filter, hideable }
export default {
  component: SelectCollection,
  config,
  transform,
  filter,
  hideable
}
