import { FormComposer } from './FormComposer'
import Textarea from './components/Textarea'
import TextInput from './components/Text'
import Checkbox from './components/Checkbox'
import ComponentLibrary  from './Components'
import DecoratorLibrary from './Decorators'
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
import { EasyForm } from './EasyForm'


// console.log(ComponentConfiguration)

export {
  EasyForm,
  ComponentLibrary,
  DecoratorLibrary,
  FormComposer, 
  TextArea,
  TextInput,
  Checkbox,
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
