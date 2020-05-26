import React from 'react'
import { translatorText } from '@lefapps/forms'
import { get, stubFalse } from 'lodash'
import ImgUpload, { UploadPreview as Preview } from 'meteor/lef:imgupload'

const removeText = 'Bestand verwijderen? | Supprimer? | Remove file?'

const UploadComponent = ({
  setProperty,
  bindInput,
  element,
  translator,
  attributes: propsAttributes
}) => {
  const { key, name, attributes: elementAttributes } = element
  const { baseUrl, uploader } = elementAttributes
  const { value } = bindInput(name)
  const bindUploadInput = name => ({
    onSubmit: (doc, thumbnails) => {
      setProperty(name, baseUrl ? doc.name : doc.url)
      if (thumbnails) setProperty(`${name}Thumbnails`, thumbnails)
    }
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
    fileUploader: !!get(elementAttributes, 'fileUploader'),
    ...elementAttributes,
    invalid: get(propsAttributes, 'invalid')
  }
  const originalPrefix =
    Meteor.settings.public.uploads[uploader || 'images'].defaultPrefix
  return (
    <div style={{ position: 'relative' }}>
      {elementAttributes.disabled ? null : ImgUpload ? (
        <ImgUpload {...bindUploadInput(name)} {...custom} _getMeta>
          {value && (
            <Preview
              url={
                baseUrl
                  ? `${baseUrl}/${uploader}/${originalPrefix}${value}`
                  : value
              }
              name={value}
            />
          )}
        </ImgUpload>
      ) : (
        'Initialising uploader ...'
      )}
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

const filter = stubFalse

export default UploadComponent
export { config, transform, filter }
