import React, { Component } from 'react'
import { translatorText } from '../translator'
import ImgUpload from 'meteor/lef:imgupload'
import { get, includes, last, lowerCase } from 'lodash'

const UploadComponent = props => {
  const { bindInput, element, translator, attributes: propsAttributes } = props
  const { key, name, type, label, attributes: elementAttributes } = element

  const modelValue = get(props.model, name, false)
  const bindUploadInput = name => ({
    onSubmit: (awsUrl, thumbnails) => props.setProperty(name, awsUrl)
  })
  const custom = {
    label: translatorText(
      get(
        elementAttributes,
        'placeholders',
        get(elementAttributes, 'placeholder', '')
      ),
      translator
    ),
    id: key,
    name,
    fileUploader: !!get(elementAttributes, 'fileUploader')
  }
  return (
    <div>
      {modelValue ? (
        includes(
          ['png', 'jpg', 'jpeg'],
          lowerCase(last(modelValue.split('.')))
        ) ? (
          <a
            href={modelValue}
            target={'_blank'}
            style={{
              margin: '1em auto',
              width: '180px',
              maxWidth: '100%',
              height: '120px',
              display: 'block',
              background: `transparent url(${modelValue}) no-repeat center center`,
              backgroundSize: 'contain'
            }}
          />
        ) : (
          <a href={modelValue} target={'_blank'}>
            {modelValue.split('/').pop()}
          </a>
        )
      ) : null}
      <ImgUpload {...bindUploadInput(name)} {...custom} />
    </div>
  )
}

const config = ({ translator, model }) => [
  {
    type: 'divider',
    key: 'upload.divider',
    layout: {
      col: {
        xs: 12
      }
    }
  },
  {
    type: 'infobox',
    key: 'upload.info',
    label: {
      nl: 'Bestanden',
      en: 'Files'
    },
    layout: {
      col: {
        xs: 12
      }
    }
  },
  {
    type: 'select',
    key: 'upload.select',
    name: 'attributes.fileUploader',
    label: {
      nl: 'Bestandsformaten',
      en: 'Allowed File Types'
    },
    options: [
      { _id: '', nl: 'Afbeeldingen', en: 'Images' },
      {
        _id: 'fileUploader',
        nl: 'Courante bestanden',
        en: 'Well-known formats'
      }
    ],
    layout: {
      col: {
        xs: 12,
        sm: 6
      }
    }
  }
]

const transform = (element, { translator }, saving) => element

export default UploadComponent
export { config, transform }
