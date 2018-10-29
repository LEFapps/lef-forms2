import React from 'react'
import { FormGroup, Label } from 'reactstrap'
import { includes, union, flip, size, upperCase, get } from 'lodash'
import { translatorText } from '../translator'

const FormGroupDecorator = WrappedComponent => props => {
  const { element, translator } = props
  const { label } = element || ''
  if (includes(['radio', 'checkbox'], props.element.type)) {
    return (
      <FormGroup check>
        <Label for={props.element.name} check>
          <WrappedComponent {...props} />
          {translatorText(element.label, translator) || element.type}
        </Label>
      </FormGroup>
    )
  } else {
    return (
      <FormGroup>
        {props.element.label ? (
          <Label for={props.element.name}>
            {translatorText(element.label, translator) || element.type}
          </Label>
        ) : null}
        <WrappedComponent {...props} />
      </FormGroup>
    )
  }
}

const config = ({ translator, model }) => {
  const { languages } = translator || {}
  if (languages) {
    const headerField = [
      {
        key: 'label.divider',
        type: 'divider',
        layout: { col: { xs: 12 } }
      },
      {
        key: 'label.infobox',
        type: 'infobox',
        label: '**Labels**',
        layout: { col: { xs: 12 } }
      }
    ]
    const languageFields = languages.map(language => ({
      key: 'label.' + language,
      name: 'label.' + language,
      type: 'text',
      label: upperCase(language),
      layout: {
        col: { xs: Math.max(3, Math.round(12 / languages.length)) }
      }
    }))
    return headerField.concat(languageFields)
  } else {
    return [
      {
        key: 'label.divider',
        type: 'divider',
        layout: { col: { xs: 12 } }
      },
      {
        key: 'label',
        name: 'label.default',
        type: 'text',
        label: 'Label',
        layout: {
          col: { xs: 12 }
        }
      }
    ]
  }
}

// Configuration of label is put in front
const combine = flip(union)

const filter = key => !includes(['divider', 'infobox'], key)

export default FormGroupDecorator
export { config, filter, combine }
