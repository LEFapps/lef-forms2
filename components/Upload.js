import React from 'react'
import { translatorText } from '@lefapps/forms'
import { get, includes, last, lowerCase, stubFalse } from 'lodash'
import { Button } from 'reactstrap'
import { Preview } from '@lefapps/uploader'

const removeText = 'Bestand verwijderen? | Supprimer? | Remove file?'

class UploadComponent extends React.Component {
  _isMounted = false
  constructor (props) {
    super(props)
    this.state = {
      ImgUpload: false,
      doc: null
    }
    this.loadUploader = this.loadUploader.bind(this)
  }
  componentDidMount () {
    this._isMounted = true
    this.loadUploader('meteor/lef:imgupload')
  }
  componentWillUnmount () {
    this._isMounted = false
  }
  loadUploader (uploader) {
    import(uploader)
      .then(module =>
        this._isMounted ? this.setState({ ImgUpload: module.default }) : null
      )
      .catch(e =>
        console.warn(
          'Uploader: ',
          e,
          'run "meteor add lef:imgupload" if this module is missing'
        )
      )
  }
  render () {
    const { ImgUpload } = this.state
    const {
      bindInput,
      element,
      translator,
      attributes: propsAttributes
    } = this.props
    const { key, name, type, label, attributes: elementAttributes } = element
    const { baseUrl, uploader } = elementAttributes
    const modelValue = get(this.props.model, name, false)
    const { value } = bindInput(name)
    const bindUploadInput = name => ({
      onSubmit: (doc, thumbnails) => {
        this.setState({ doc })
        this.props.setProperty(name, baseUrl ? doc.name : doc.url)
        if (thumbnails) this.props.setProperty(`${name}Thumbnails`, thumbnails)
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
            {value ? (
              <Preview
                url={
                  baseUrl
                    ? `${baseUrl}/${uploader}/${originalPrefix}${value}`
                    : value
                }
                name={value}
              />
            ) : null}
          </ImgUpload>
        ) : (
          'Initialising uploader ...'
        )}
      </div>
    )
  }
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
