import React, { Component } from 'react'
import reformed from 'react-reformed'
import { Input } from 'reactstrap'
import GenericInput from './GenericInput'


const Textarea = GenericInput

const config = [
      {
        name: "name",
        type: "text",
        label: "Field name",
        validation: { required: true },
        attributes: {
          size: "15"
        },
        layout: {col: {md:"12"}}
      },
      {
        name: "attributes.rows",
        type: "text",
        label: "Number of rows",
        layout: {col: {md:"4"}}
      }
]

export default Textarea
export { config }
