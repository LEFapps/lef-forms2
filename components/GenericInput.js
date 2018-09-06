import React, { Component } from 'react'
import { Input } from 'reactstrap'

const GenericInput = ({ bindInput, element, attributes, children })=> {
  const { name, type, attributes: elementAttributes } = element
  return <Input type={type}  {...bindInput(name)} {...elementAttributes} {...attributes}>
    {children}
  </Input>
}

GenericInput.displayName = 'Input'

export default GenericInput
