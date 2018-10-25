import React, { Component } from 'react'
import { Random } from 'meteor/random'
import { FormComposer } from './FormComposer'
import reformed from './reformed'
import { prepareForEditor, prepareForSaving } from './editor/dataTransformer'
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
  UncontrolledCollapse,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import {
  size,
  get,
  flow,
  find,
  isArray,
  isPlainObject,
  capitalize,
  upperCase,
  includes,
  cloneDeep
} from 'lodash'

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

class EditorCard extends Component {
  constructor (props) {
    super(props)
  }
  shouldComponentUpdate (nextProps, nextState) {
    // performance gets really bad when not doing this!
    const propsResult = JSON.stringify(this.props) != JSON.stringify(nextProps)
    // const elementResult = this.props.element
    console.log(
      JSON.stringify(this.props.element),
      JSON.stringify(nextProps.element)
    )
    return propsResult // || elementResult
  }
  render () {
    const {
      library,
      index,
      element,
      elements,
      setElementModel,
      onRemove,
      onMoveElement,
      onDuplicate,
      canMove
    } = this.props
    const toggle = `toggle-element-${index}-${element.type}`
    const has = (element, field) => !!find(element, e => e.name == field)
    const dependentOn = get(element, 'dependent.on')
    return (
      <Card
        style={{ margin: '1rem 0', marginLeft: dependentOn ? '1rem' : '0' }}
      >
        <CardHeader>
          <ButtonGroup className={'float-right'} style={{ zIndex: 20 }}>
            <Button
              outline
              color={'danger'}
              title={'Remove Element'}
              onClick={() => onRemove(element)}
            >
              ✕
            </Button>
            <Button
              outline
              color={'success'}
              title={'Duplicate Element'}
              onClick={() => onDuplicate(element)}
            >
              ⧉
            </Button>
            <Button
              outline
              color={'info'}
              title={'Move Element Up'}
              onClick={() => onMoveElement(element, -1)}
              disabled={!canMove(index, -1)}
            >
              △
            </Button>
            <Button
              outline
              color={'info'}
              title={'Move Element Down'}
              onClick={() => onMoveElement(element, 1)}
              disabled={!canMove(index, 1)}
            >
              ▽
            </Button>
          </ButtonGroup>
          <CardTitle id={toggle} style={{ cursor: 'pointer' }}>
            {has(elements, 'label')
              ? element.label && element.label.translate
                ? element.label.translate
                : (size(element.label) > 64
                    ? element.label.substr(0, 50) + '…'
                    : element.label) || <em>_label</em>
              : element.type}
          </CardTitle>
          <CardSubtitle>
            <small className='text-muted'>
              <Badge color='light'>{upperCase(element.type)}</Badge>{' '}
              {has(elements, 'name')
                ? element.name || <em>_identifier</em>
                : null}
              {dependentOn ? `, depends on ${dependentOn}` : null}
            </small>
          </CardSubtitle>
        </CardHeader>
        <UncontrolledCollapse toggler={`#${toggle}`}>
          <CardBody>
            <ElementEditor
              el={element}
              library={library}
              elements={elements}
              initialModel={element}
              setElement={setElementModel}
            />
          </CardBody>
        </UncontrolledCollapse>
      </Card>
    )
  }
}

class FormEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPreview: true,
      elements: this.props.initialModel
        ? this.props.initialModel.map(e => prepareForEditor(e))
        : []
    }
    this.setElement = this.setElement.bind(this)
    this.save = this.save.bind(this)
    this.addElement = this.addElement.bind(this)
    this.removeElement = this.removeElement.bind(this)
    this.moveElement = this.moveElement.bind(this)
    this.duplicateElement = this.duplicateElement.bind(this)
    this.showPreview = this.showPreview.bind(this)
    this.showPreview = this.showPreview.bind(this)
  }
  setElement (index, element) {
    this.setState(prevstate => {
      prevstate.elements[index] = prepareForEditor(element)
      return { elements: prevstate.elements }
    })
    this.showPreview(false)
    return element
  }
  save () {
    this.props.onSubmit(this.state.elements.map(e => prepareForSaving(e)))
  }
  addElement (type) {
    this.setState(prevstate => {
      prevstate.elements.push({ type, key: Random.id() })
      return {
        elements: prevstate.elements
      }
    })
    this.showPreview(false)
  }
  duplicateElement (element) {
    this.setState(prevstate => {
      const index = prevstate.elements.indexOf(element)
      const duplicate = cloneDeep(prevstate.elements[index])
      if (duplicate) {
        if (duplicate.name) duplicate.name += '_copy'
        if (duplicate.label) duplicate.label += ' (copy)'
        if (duplicate.key) duplicate.key = Random.id()
        prevstate.elements.splice(index + 1, 0, duplicate)
        return { elements: prevstate.elements }
      } else {
        return { elements: prevstate.elements }
        console.error(`Element not found (${element.name}, ${index}).`)
      }
    })
    this.showPreview(false)
  }
  moveElement (element, direction) {
    this.setState(prevstate => {
      const index = prevstate.elements.indexOf(element)
      prevstate.elements.splice(index, 1)
      prevstate.elements.splice(index + direction, 0, element)
      return { elements: prevstate.elements }
    })
    this.showPreview(false)
  }
  moveElementUp (element) {
    this.moveElement(element, -1)
  }
  moveElementDown (element) {
    this.moveElement(element, 1)
  }
  removeElement (element) {
    if (
      confirm(`Are you sure you want to remove the element "${element.name}"`)
    ) {
      this.setState(prevstate => {
        const index = this.state.elements.indexOf(element)
        if (index >= 0) {
          prevstate.elements.splice(index, 1)
          return {
            elements: prevstate.elements
          }
        } else console.error(`Element not found (${element.name}, ${index}).`)
      })
      this.showPreview(false)
    }
  }
  showPreview (show = true) {
    this.setState({ showPreview: show })
  }
  render () {
    const { library } = this.props
    const { previewLibrary = library } = this.props
    const ReformedFormComposer = reformed()(FormComposer)
    const totalElements = this.state.elements.length
    const canMove = (index, dir) =>
      dir < 0 ? index > 0 : index < totalElements - 1
    return (
      <Container>
        <ButtonMenu library={library} addElement={this.addElement} />
        {this.state.elements.map((element, index) => {
          if (library.has(element.type)) {
            const elements = library.get(element.type).config()
            const setElementModel = el => {
              this.setElement(index, el)
              return el
            }
            return (
              <EditorCard
                library={library}
                index={index}
                canMove={canMove}
                element={element}
                elements={elements}
                setElementModel={setElementModel}
                onRemove={this.removeElement}
                onDuplicate={this.duplicateElement}
                onMoveElement={this.moveElement}
                key={`element-${element.key}`}
              />
            )
          } else return null
        })}
        <Row>
          <Col md={12}>
            <Button onClick={this.save}>Save</Button>
          </Col>
        </Row>
        <hr />
        {this.state.showPreview ? (
          <Row>
            <Col xs={12}>
              <h3>Preview</h3>
              <ReformedFormComposer
                library={previewLibrary}
                elements={cloneDeep(this.state.elements).map(e =>
                  prepareForSaving(e)
                )}
              />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col xs={12}>
              <p>
                The form has changed. Click the button below to load preview
                again.
              </p>
            </Col>
            <Col>
              <Button onClick={this.showPreview}>Load preview</Button>
            </Col>
          </Row>
        )}
      </Container>
    )
  }
}

const ButtonMenu = props => {
  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle caret>Add an Element&nbsp;</DropdownToggle>
      <DropdownMenu>
        <ButtonGroup vertical>
          {Array.from(props.library.keys()).map(type => {
            return (
              <DropdownItem
                key={`add-${type}`}
                onClick={() => props.addElement(type)}
              >
                {capitalize(type)}
              </DropdownItem>
            )
          })}
        </ButtonGroup>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  )
}

// const configuration
//

export { ElementEditor, FormEditor }
