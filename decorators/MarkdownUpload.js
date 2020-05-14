import React, { Component } from 'react'
import { union, flip } from 'lodash'
import { Row, Col, Button, Input } from 'reactstrap'

const initState = {
  url: null,
  fileName: null,
  altTag: '',
  imgClasses: [],
  cursorPosition: 0
}

class MarkdownUpload extends Component {
  _isMounted = false
  constructor (props) {
    super(props)
    this.state = initState
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
        this._isMounted
          ? this.setState({ UploadComponent: module.default })
          : null
      )
      .catch(e =>
        console.warn(
          'MardownUpload: ',
          e,
          'run "meteor add lef:imgupload" if this module is missing'
        )
      )
  }
  onUpload = ({ name, url }) => {
    this.setState({ fileName: name, url })
  }
  setAltTag = e => this.setState({ altTag: e.target.value })
  setClass = i => e => {
    const { imgClasses } = this.state
    imgClasses[i] = e.target.value
    this.setState({ imgClasses })
  }
  addImage = () => {
    const {
      bindInput,
      element: {
        name,
        upload: { sizes }
      }
    } = this.props
    const { fileName, altTag, url, imgClasses, cursorPosition } = this.state
    let value = bindInput(name).value || ''
    // TODO: USE THIS FOR PICTURE SUPPORT, NOT YET COMPATIBLE WITH FIGURE/FIGCAPTION
    // value += `\n\n![${altTag || fileName}](${url} "${altTag || fileName}")`
    // sizes.forEach(({ label, mediaMinWidth }) => {
    //   if (!mediaMinWidth) {
    //     console.warn(
    //       'MarkdownImageUpload: mediaMinWidth not defined for: ',
    //       label
    //     )
    //   }
    //   value += `(${url.replace(
    //     '/original/',
    //     `/${label || 'original'}/`
    //   )} "(min-width:${mediaMinWidth}px)")`
    // })
    const size = sizes.find(({ width }) => 500 < width && width < 700).label
    // MD-IT IMAGE
    // value += `\n\n![${altTag || fileName}](${url.replace(
    //   '/original/',
    //   `/${size || 'original'}/`
    // )})`
    const image = `\n\n<figure class="${imgClasses.join(
      ' '
    )}"><img src="${url.replace(
      '/original/',
      `/${size || 'original'}/`
    )}"><figcaption>${altTag || fileName}</figcaption></figure>\n\n`
    // ADDING MD-IT-ATTRS CLASSES
    // if (imgClasses.length > 0) {
    //   value += ' { '
    //   imgClasses.map(iC => iC && iC !== '-' && (value += `.${iC} `))
    //   value += '}'
    // }
    const output = [
      value.slice(0, cursorPosition),
      image,
      value.slice(cursorPosition)
    ].join('')
    bindInput(name).onChange({ target: { name, value: output } })
    this.setState(initState)
  }
  setCursorPosition = n => {
    this.setState({ cursorPosition: n })
  }
  render () {
    const { UploadComponent, url, altTag } = this.state
    const {
      children,
      bindInput,
      element: {
        name,
        upload: {
          sizes,
          uploader,
          possibleClasses,
          altTagPlaceholder,
          placeholder
        }
      }
    } = this.props
    const { value } = bindInput(name)
    const originalPrefix =
      Meteor.settings.public.uploads[uploader || 'images'].defaultPrefix
    return (
      <>
        {UploadComponent ? (
          <Col md='12'>
            <UploadComponent
              onSubmit={this.onUpload}
              sizes={sizes}
              label={placeholder}
              uploader={uploader}
              altTag={altTag}
              _getMeta
            >
              {url && (
                <Row>
                  <Col sm='2'>
                    <img className='img-fluid' src={url} />
                  </Col>
                  <Col>
                    <Input
                      onChange={this.setAltTag}
                      placeholder={altTagPlaceholder || 'alt tag'}
                    />
                  </Col>
                  {(possibleClasses || []).map((classGroup, i) => (
                    <Col key={`add-img-class-group-${i}`}>
                      <Input type='select' onChange={this.setClass(i)}>
                        <option>-</option>
                        {classGroup.map((classOption, j) => (
                          <option key={`add-img-class-option-${j}`}>
                            {classOption}
                          </option>
                        ))}
                      </Input>
                    </Col>
                  ))}
                  <Col>
                    <Button onClick={this.addImage}>add</Button>
                  </Col>
                </Row>
              )}
            </UploadComponent>
          </Col>
        ) : (
          'Initialising uploader ...'
        )}
        {React.cloneElement(children, {
          setCursorPosition: this.setCursorPosition
        })}
      </>
    )
  }
}

const MarkdownUploadDecorator = Markdown => props => {
  if (props.element.upload) {
    return (
      <MarkdownUpload {...props}>
        <Markdown {...props} />
      </MarkdownUpload>
    )
  } else {
    return <Markdown {...props} />
  }
}

const transform = element => {
  return element
}

const config = () => [
  {
    key: 'markdownUpload',
    name: 'markdownUpload',
    type: 'textarea',
    label: 'Markdown textarea field with upload capability',
    layout: { col: { md: 12 } }
  }
]

const combine = flip(union)

const filter = componentType => componentType === 'textarea'

export default {
  decorator: MarkdownUploadDecorator,
  transform,
  config,
  combine,
  filter
}
