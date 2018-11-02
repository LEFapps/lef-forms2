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
        get(elementAttributes, 'placeholder', label)
      ),
      translator
    ),
    id: key,
    name
  }
  return (
    <div>
      {modelValue ? (
        includes(
          ['png', 'jpg', 'jpeg'],
          lowerCase(last(modelValue.split('.')))
        ) ? (
          <div
            style={{
              margin: '1em auto',
              width: '180px',
              maxWidth: '100%',
              height: '120px',
              background: `transparent url(${modelValue}) no-repeat center center`,
              backgroundSize: 'contain'
            }}
          />
        ) : (
          <a href={modelValue} target={'_blank'} />
        )
      ) : null}
      <ImgUpload {...bindUploadInput(name)} {...custom} />
    </div>
  )
}

const config = ({ translator, model }) => []

const transform = (element, { translator }, saving) => element

export default UploadComponent
// export { config, transform }
