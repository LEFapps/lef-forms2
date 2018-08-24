import React from 'react'
import PropTypes from 'prop-types'
import assign from 'object-assign'
import hoistNonReactStatics from 'hoist-non-react-statics'

const makeWrapper = (middleware) => (WrappedComponent) => {
  class FormWrapper extends React.Component {
    static propTypes = {
      initialModel: PropTypes.object,
    }

    constructor (props, ctx) {
      super(props, ctx)
      this.state = {
        model: props.initialModel || {},
      }
      class ModelHandlerWrapper {
        constructor({getState,setState}) {
          this.getState = getState
          this.setState = setState
        }
        setModel = (model) => { 
          this.setState({model})
          return model
        }
        getModel = ()=> getState("model")
        getModelValue = (name)=> this.getModel()[name]
        setModelValue = (name,value)=> {
          return this.setModel(assign({}, this.getModel(), {
            [name]: value,
          }))
        }
      }
      const getState = (name) => this.state[name]
      this.modelHandler = new ModelHandlerWrapper({getState: getState, setState: this.setState.bind(this)})
      if (typeof middleware === 'function') {
        this.modelHandler = middleware(this.modelHandler)
      }
    }

    setModel = (model) => {
      return this.modelHandler.setModel(model)
    }

    setProperty = (prop, value) => {
      return this.modelHandler.setModelValue(prop,value)
    }

    // This, of course, does not handle all possible inputs. In such cases,
    // you should just use `setProperty` or `setModel`. Or, better yet,
    // extend `reformed` to supply the bindings that match your needs.
    bindToChangeEvent = (e) => {
      const { name, type, value } = e.target

      if (type === 'checkbox') {
        const oldCheckboxValue = this.modelHandler.getModelValue(name) || []
        const newCheckboxValue = e.target.checked
          ? oldCheckboxValue.concat(value)
          : oldCheckboxValue.filter(v => v !== value)

        this.setProperty(name, newCheckboxValue)
      } else {
        this.setProperty(name, value)
      }
    }

    bindInput = (name) => {
      return {
        name,
        value: this.modelHandler.getModelValue(name) || '',
        onChange: this.bindToChangeEvent,
      }
    }

    render () {
      let nextProps = assign({}, this.props, {
        model: this.modelHandler.getModel(),
        setProperty: this.setProperty,
        setModel: this.setModel,
        bindInput: this.bindInput,
        bindToChangeEvent: this.bindToChangeEvent
      })

      return React.createElement(WrappedComponent, nextProps)
    }
  }

  FormWrapper.displayName = `Reformed(${getComponentName(WrappedComponent)})`
  return hoistNonReactStatics(FormWrapper, WrappedComponent)
}

const getComponentName = (component) => (
  component.displayName ||
  component.name
)

export default makeWrapper
