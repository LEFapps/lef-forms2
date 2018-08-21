# Forms v2

This is a composition based form generator. Every composed form is also [reformed](https://github.com/davezuko/react-reformed), allowing for easy model bindings.

A composed form has two requisites:
- The configuration of the different elements of the form.
- A component library that provides a component for every element type.

It is entirely possible to use your own syntax for the configuration, as well as write and use your own components. As long as the component in the library that "matches" the supplied element knows how to handle the supplied `props`, it will work.

## Simple example

Let's assume the form is configured with a hardcoded list of elements:

```JSX
const formElements = [
  {
    name: 'foo',
    type: 'textarea'
    attributes: {
      rows: 5,
    }
  },
  {
    name: 'bar',
    type: 'text'
  },
]
```

As for the component library, we can use the `DefaultComponents`, which is a simple library of "reformed" `reactstrap` form components.

```JSX
class Example extends Component {
  _onSubmit = (model) => {
    // this gets called when the form is submitted
    // e.preventDefault() has already been called of course
    console.log(model);
  }
  render() {
    return (
      <FormComposer
        elements={formElements}
        components={DefaultComponents}
        initialModel={{bar: "Example text"}}
        onSubmit={this._onSubmit}
        <Button type="submit">Submit</Button>
      </FormComposer>
    )
  }
}
```

`initialModel` is used by `reformed` to fill the initial values.

Note that the `attributes` from the element are applied directly to the `Input` component by the `Textarea` component. This is an example of a _convention_ from this specific component library. Similarly, `name` and `type` are applied as you would expect.

## Using decorators

This is where the magic happens. Essentially what we can do is _modify_ the component library, so that a higher order component (the decorator) is in control of the render function. The decorator can e.g. inject props, decide to render something completely different or wrap the component in something.

Let's assume for instance that we would like to wrap every form component in a `FormGroup` and add a label if is present in the element configuration. It would look something like this:

```JSX
const FormGroupDecorator = WrappedComponent => props => ( 
  <FormGroup>
    {props.element.label?<Label for={props.element.name}>{props.element.label}</Label>:null}
    <WrappedComponent {...props} /> // don't forget to "push down" the props into the wrapped component
  </FormGroup>
)
```

We can apply this to the entire component library using the `decorate` function:

```JSX
const decoratedComponents = decorate(FormGroupDecorator)(DefaultComponents)
```
(And use `decoratedComponents` instead of DefaultComponents for the `components` attribute of the `FormComposer` of course.)

To make use of the new `label` functionality, we can add them to the element configuration:

```JSX
const formElements = [
  {
    name: 'foo',
    label: 'Fill your foo',
    type: 'textarea',
    attributes: {
      rows: 5,
    },
  },
  {
    name: 'bar',
    label: 'Add your bar',
    type: 'text'
  },
]
```

Note that the `props` that are passed to the decorator include both `element` configuration, as well as the `model`. This means the decorator could easily respond to the current values in _any part_ of the form.

## More complex example

Let's say you want to add attributes to the underlying components, but only *after* the submit button has been pushed, for instance to add validation errors.

This could be achieved by passing a helper function that is later used by a decorator as such:

```JSX
class App extends Component {
  constructor(props) {
    super(props)
    this.getAttributes = this.getAttributes.bind(this)
    this._onSubmit = this._onSubmit.bind(this)
    this.state = {validationErrors:{}}
  }
  _onSubmit = (model) => {
    console.log(model);
    const errors = {}
    forEach(formElements, (element) => {
      if (element.validation && element.validation.required && isEmpty(model[element.name])) {
        errors[element.name] = { invalid: true, className: "incorrect"}
      }
    })
    this.setState({validationErrors:errors})
    if (isEmpty(errors)) {
      console.log("Form looks ok!")
    } else {
      console.log("Form has errors!")
    }
  }
  getAttributes(element) {
    return this.state.validationErrors[element.name]
  }
  render() {
    return (
      <FormComposer
        elements={formElements}
        components={decoratedComponents}
        initialModel={{bar: "Example text"}}
        onSubmit={this._onSubmit}
        getAttributes={this.getAttributes}>
        <Button type="submit">Submit</Button>
      </FormComposer>
    )
  }
}
```

We'll still need a decorator that picks up this `getAttributes` function and uses it to add attributes to the wrapped component:

```JSX
const AttributesDecorator = WrappedComponent => props => {
  const { getAttributes } = props
  if (typeof getAttributes != 'function') {
    throw new TypeError("Expected 'getAttributes' prop to be a function, did you set it?")
  }
  return <WrappedComponent {...props} attributes={getAttributes(props.element)} />
}
```

To use multiple decorators, you can use the `flowDecorators` function which applies all the decorators _in sequence_. (Keep the sequence in mind if you are expecting interaction between the decorators.)

```JSX
const decoratedComponents = flowDecorators([AttributesDecorator,FormGroupDecorator])(DefaultComponents)
```

And of course, we'll need to extend our configuration to see the effect:

```JSX
const formElements = [
  {
    name: 'foo',
    label: 'Example label',
    type: 'textarea',
    attributes: {
      rows: 5,
    },
    validation: {
      required: true
    }
  },
  {
    name: 'bar',
    type: 'text'
  },
]
```
