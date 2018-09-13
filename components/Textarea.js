import React from 'react'
import { GenericInputNoChildren } from './GenericInput'
import { MarkdownImageUpload } from 'meteor/lef:imgupload'
import { get } from 'lodash'
import { MarkdownHelp } from 'meteor/lef:translations'

const Textarea = props => {
  const onUrl = url => {
    props.setProperty(
      props.element.name,
      `${get(props.model, props.element.name)}\n${url}`
    )
  }
  return (
    <>
      <GenericInputNoChildren {...props} />
      {props.element.md ? (
        <>
          <MarkdownHelp />
          <MarkdownImageUpload onSubmit={onUrl} />
        </>) : null}
    </>
  )
}

const config = [
  {
    name: 'name',
    type: 'text',
    label: 'Field name',
    validation: { required: true },
    attributes: {
      size: '15'
    },
    layout: { col: { md: '12' } }
  },
  {
    name: 'attributes.rows',
    type: 'text',
    label: 'Number of rows',
    layout: { col: { md: '4' } }
  }
]

export default Textarea
export { config }
