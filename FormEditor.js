import React, { Component } from 'react'
import { FormComposer, ReformedFormComposer } from './FormComposer'
import { Container, Row, Col, Button } from 'reactstrap'
import reformed from './reformed'
import { flow, map } from 'lodash'

class ElementEditor extends Component {
  constructor(props) {
    super(props)
    // insert middleware into reformed
    // to intercept the setModel call 
    // to push model state
    // up the hierarchy:
    this.middleware = (modelHandler)=> {
      modelHandler.setModel = flow([modelHandler.setModel,this.props.setElement])
      return modelHandler
    }
    this.ElementForm = reformed(this.middleware)(FormComposer)
  }
  render() {
    return <this.ElementForm {...this.props} />
  }
}

class FormEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { elements: this.props.initialModel || []}
    this.setElement = this.setElement.bind(this)
  }
  setElement(index,element) {
    const elements = this.state.elements
    elements[index] = element
    this.setState({elements})
    return element
  }
  save = ()=>{
   console.log(this.state.elements) 
  }
  addElement = (type)=> {
    const elements = this.state.elements
    elements.push({type})
    this.setState({elements})
  }
  render() {
    const { library, componentConfigurations } = this.props
    return (
      <Container>
        <ButtonMenu library={library} addElement={this.addElement}/>
        {this.state.elements.map((element,index) => {
          const elements = componentConfigurations[element.type]
          const setElementModel = (el)=> {
            this.setElement(index,el)
            return el
          }
          return (
            <ElementEditor 
              library={library}
              elements={elements}
              initialModel={element}
              setElement={setElementModel}
              formAttributes={{className:"row"}}
              key={`element-${index}`}
            />
          )
        })}
        <Row>
          <Col>
            <Button onClick={this.save}>Save</Button>
          </Col>
        </Row>
        <Row>
          <h3>Preview</h3>
        </Row>
        <ReformedFormComposer
          library={library}
          elements={this.state.elements}
          formAttributes={{className:"row"}}
        />
      </Container>
    )
  }
}

const ButtonMenu = (props)=> {
  return (
    <Row>
      {map(props.library,(FormComponent,type)=> {
        return <Col key={`add-${type}`}><Button onClick={()=>props.addElement(type)}>Add {type}</Button></Col>
      }
      )}
      <hr/>
    </Row>
  )
}

// const configuration
//

export { ElementEditor, FormEditor }
