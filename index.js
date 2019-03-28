import {
  EasyForm,
  FormComposer,
  ElementEditor,
  FormEditor,
  DefaultComponents,
  DefaultDecorators,
  Textarea,
  TextInput,
  Checkbox,
  CheckboxMC,
  Radio,
  Select,
  Divider,
  InfoBox,
  FormGroupDecorator,
  AttributesDecorator,
  LayoutDecorator,
  DependentDecorator,
  ValidateDecorator,
  NameDecorator,
  PlaceholderDecorator
} from '@lefapps/forms'

import SelectCollection, {
  config as scConfig,
  transform as scTransform
} from './components/SelectCollection'
import CheckboxMcCollection, {
  config as cmcConfig,
  transform as cmcTransform
} from './components/CheckboxMcCollection'
import Upload, {
  config as uConfig,
  transform as uTransform
} from './components/Upload'

const Form = new EasyForm()

Form.addComponent('select-collection', {
  component: SelectCollection,
  config: scConfig,
  transform: scTransform
})
Form.addComponent('checkbox-mc-collection', {
  component: CheckboxMcCollection,
  config: cmcConfig,
  transform: cmcTransform
})
Form.addComponent('upload', {
  component: Upload,
  config: uConfig,
  transform: uTransform
})

const Editor = Form.editor()

// console.log(ComponentConfiguration)

export { Form, Editor }

export {
  EasyForm,
  FormComposer,
  FormEditor,
  ElementEditor,
  DefaultComponents,
  DefaultDecorators
}

export {
  Textarea,
  TextInput,
  Checkbox,
  CheckboxMC,
  CheckboxMcCollection,
  Radio,
  Select,
  SelectCollection,
  InfoBox,
  Divider,
  Upload
}

export {
  FormGroupDecorator,
  AttributesDecorator,
  LayoutDecorator,
  ValidateDecorator,
  DependentDecorator,
  NameDecorator,
  PlaceholderDecorator
}
