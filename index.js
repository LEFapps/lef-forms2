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
  PlaceholderDecorator,
  Subform,
  Editor
} from '@lefapps/forms'

import SelectCollection from './components/SelectCollection'
import CheckboxMcCollection from './components/CheckboxMcCollection'
import Upload from './components/Upload'

const Form = new EasyForm()

Form.addComponent('select-collection', CheckboxMcCollection)
Form.addComponent('checkbox-mc-collection', SelectCollection)
Form.addComponent('upload', Upload)

const FormEdit = Form.editor()

export { Form, FormEdit }

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
  Upload,
  Subform,
  Editor
}

export {
  CheckboxMcCollectionComponent,
  SelectCollectionComponent,
  UploadComponent
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
