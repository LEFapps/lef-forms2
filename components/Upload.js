import React from 'react'
import { translatorText } from '@lefapps/forms'
import { get, set, includes, last, lowerCase } from 'lodash'
import { Button } from 'reactstrap'

const removeText = 'Bestand verwijderen? | Supprimer? | Remove file?'

class UploadComponent extends React.Component {
  _isMounted = false
  constructor (props) {
    super(props)
    this.state = {
      ImgUpload: false
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
    const modelValue = get(this.props.model, name, false)
    const { onChange } = bindInput(name)
    const bindUploadInput = name => ({
      onSubmit: (awsUrl, thumbnails) => {
        this.props.setProperty(name, awsUrl)
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
    return (
      <div style={{ position: 'relative' }}>
        {modelValue ? (
          includes(
            ['png', 'jpg', 'jpeg'],
            lowerCase(last(modelValue.split('.')))
          ) ? (
            <>
              <a
                href={modelValue}
                target={'_blank'}
                style={{
                  position: 'relative',
                  margin: '1em auto',
                  width: '180px',
                  maxWidth: '100%',
                  height: '120px',
                  display: 'block',
                  backgroundColor: 'transparent',
                  backgroundImage: `url(${modelValue})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundSize: 'contain'
                }}
              />
              <Button
                style={{
                  position: 'absolute',
                  top: '0px',
                  right: '0px'
                }}
                className={'imgUpload__removeButton'}
                size={'sm'}
                color={'danger'}
                onClick={() =>
                  confirm(removeText)
                    ? onChange({ target: { name, value: undefined } })
                    : null
                }
              >
                &times;
              </Button>
            </>
            ) : (
            <>
              <a href={modelValue} target={'_blank'}>
                {modelValue.split('/').pop()}
              </a>{' '}
              <span
                className={'imgUpload__removeButton text-danger'}
                onClick={() =>
                  confirm(removeText)
                    ? onChange({ target: { name, value: undefined } })
                    : null
                }
              >
                &times;
              </span>
            </>
            )
        ) : null}
        {elementAttributes.disabled ? null : ImgUpload ? (
          <ImgUpload {...bindUploadInput(name)} {...custom} />
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

export default UploadComponent
export { config, transform }
