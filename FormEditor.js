import React, { Component } from 'react'
import { FormComposer } from './FormComposer'
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardHeader,
  CardFooter,
  UncontrolledCollapse
} from 'reactstrap'
import { flow, isArray, capitalize, upperCase, includes } from 'lodash'
import reformed from './reformed'

class ElementEditor extends Component {
  constructor (props) {
    super(props)
    // insert middleware into reformed
    // to intercept the setModel call
    // to push model state
    // up the hierarchy:
    this.middleware = modelHandler => {
      modelHandler.setModel = flow([
        modelHandler.setModel,
        this.props.setElement
      ])
      return modelHandler
    }
    this.ElementForm = reformed(this.middleware)(FormComposer)
  }
  render () {
    return <this.ElementForm {...this.props} />
  }
}

const EditorCard = ({
  library,
  index,
  element,
  elements,
  setElementModel,
  onRemove
}) => {
  const toggle = `toggle-element-${index}-${element.type}`
  return (
    <Card style={{ margin: '1rem 0' }}>
      <CardHeader id={toggle}>
        <CardTitle>{element.label || '_'}</CardTitle>
        <CardSubtitle>
          <small className='text-muted'>
            <Badge color='light'>{upperCase(element.type)}</Badge>{' '}
            {element.name || '_'}
          </small>
        </CardSubtitle>
      </CardHeader>
      <UncontrolledCollapse toggler={`#${toggle}`}>
        <CardBody>
          <ElementEditor
            library={library}
            elements={elements}
            initialModel={element}
            setElement={setElementModel}
          />
        </CardBody>
        <CardFooter>
          <Button color={'danger'} onClick={() => onRemove(element)}>
            Remove
          </Button>
        </CardFooter>
      </UncontrolledCollapse>
    </Card>
  )
}

class FormEditor extends Component {
  constructor (props) {
    super(props)
    this.state = { elements: this.props.initialModel || [] }
    this.setElement = this.setElement.bind(this)
    this.save = this.save.bind(this)
    this.addElement = this.addElement.bind(this)
    this.removeElement = this.removeElement.bind(this)
  }
  setElement (index, element) {
    this.setState(prevstate => {
      prevstate.elements[index] = element
      return { elements: prevstate.elements }
    })
    return element
  }
  save () {
    this.props.onSubmit(this.state.elements)
  }
  addElement (type) {
    this.setState(prevstate => {
      prevstate.elements.push({ type })
      return {
        elements: prevstate.elements
      }
    })
  }
  removeElement (element) {
    if (
      confirm(`Are you sure you want to remove the element "${element.name}"`)
    ) {
      const index = this.state.elements.indexOf(element)
      if (index >= 0) {
        this.setState(prevstate => {
          prevstate.elements.splice(index, 1)
          return {
            elements: prevstate.elements
          }
        })
      } else console.error(`Element not found (${element.name}, ${index}).`)
    }
  }
  render () {
    const { library } = this.props
    const { previewLibrary = library } = this.props
    const ReformedFormComposer = reformed()(FormComposer)
    return (
      <Container>
        <ButtonMenu library={library} addElement={this.addElement} />
        {this.state.elements.map((element, index) => {
          const elements = library.get(element.type).config
          const setElementModel = el => {
            this.setElement(index, el)
            return el
          }
          return (
            <EditorCard
              library={library}
              index={index}
              element={element}
              elements={elements}
              setElementModel={setElementModel}
              onRemove={this.removeElement}
              key={`element-${index}`}
            />
          )
        })}
        <Row>
          <Col md={12}>
            <Button onClick={this.save}>Save</Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h3>Preview</h3>
            <ReformedFormComposer
              library={previewLibrary}
              elements={this.state.elements}
              formAttributes={{ className: 'row' }}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

const ButtonMenu = props => {
  return (
    <ButtonGroup>
      {Array.from(props.library.keys()).map(type => {
        return (
          <Button key={`add-${type}`} onClick={() => props.addElement(type)}>
            {capitalize(type)}
          </Button>
        )
      })}
    </ButtonGroup>
  )
}

// const configuration
//

export { ElementEditor, FormEditor }
