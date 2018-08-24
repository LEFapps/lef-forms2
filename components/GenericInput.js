import React, { Component } from 'react'
import { Input } from 'reactstrap'

const GenericInput = ({ bindInput, element, attributes })=> {
  const { name, type, attributes: elementAttributes } = element
  return <Input type={type}  {...bindInput(name)} {...elementAttributes} {...attributes} />      
}

export default GenericInput
