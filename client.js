import { FormComposer, ReformedFormComposer } from './FormComposer'
import Textarea from './components/Textarea'
import TextInput from './components/Text'
import Checkbox from './components/Checkbox'
import Components, { ComponentConfiguration } from './Components'
import Decorators, { DecoratorConfiguration } from './Decorators'
import {
  decorate,
  flowDecorators,
  flowDecoratorConfigFirst,
  flowDecoratorConfigLast,
  flowDecoratorConfig
} from './helpers'
import FormGroupDecorator from './decorators/FormGroup'
import AttributesDecorator from './decorators/Attributes'
import LayoutDecorator from './decorators/Layout'
import { ElementEditor, FormEditor } from './FormEditor'

// console.log(ComponentConfiguration)

export {
  FormComposer,
  ReformedFormComposer,
  TextArea,
  TextInput,
  Checkbox,
  Components as DefaultComponents,
  ComponentConfiguration as DefaultComponentConfiguration,
  Decorators as DefaultDecorators,
  DecoratorConfiguration as DefaultDecoratorConfiguration,
  decorate,
  flowDecorators,
  FormGroupDecorator,
  AttributesDecorator,
  LayoutDecorator,
  ElementEditor,
  FormEditor,
  flowDecoratorConfigFirst,
  flowDecoratorConfigLast,
  flowDecoratorConfig
}
