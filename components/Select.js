import React, { Component } from 'react'
import { Input } from 'reactstrap'
import GenericInput from './GenericInput'
import { map } from 'lodash'

const Select = props => { 
  const { element } = props
  return (
    <GenericInput {...props}>
      { element.options.map((option,i)=> <option key={`option-${i}`}>{option}</option>)}
    </GenericInput>
  )
}

export default Select
