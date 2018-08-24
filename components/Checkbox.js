import React, { Component } from 'react'
import { Input } from 'reactstrap'
import GenericInput from './GenericInput'

const Checkbox = GenericInput

Checkbox.displayName = "Checkbox"
  
const config = [
      {
        name: "name",
        type: "text",
        label: "Field name",
        validation: { required: true },
        layout: {col: {md:"12"}},
      },
      {
        name: "value",
        type: "text",
        label: "Value",
        layout: {col: { md:"12" }}
      }
]

export default Checkbox
export { config }
