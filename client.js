import { FormComposer } from './FormComposer'
import { Textarea } from './components/Textarea'
import Components, { ComponentConfiguration }  from './Components'
import { decorate, flowDecorators } from './helpers'
import { FormGroupDecorator } from './decorators/FormGroupDecorator'
import { AttributesDecorator } from './decorators/AttributesDecorator'
import { ElementEditor } from './FormEditor'


console.log(ComponentConfiguration)

export { 
  FormComposer, 
  TextArea, 
  Components as DefaultComponents, 
  ComponentConfiguration as DefaultComponentConfiguration,
  decorate, 
  flowDecorators,
  FormGroupDecorator,
  AttributesDecorator,
  ElementEditor
}
