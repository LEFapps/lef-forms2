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

// Components
import SelectCollection, {
  config as scConfig,
  transform as scTransform,
  filter as scFilter
} from './components/SelectCollection'
import CheckboxMcCollection, {
  config as cmcConfig,
  transform as cmcTransform,
  filter as cmcFilter
} from './components/CheckboxMcCollection'
import Upload, {
  config as uConfig,
  transform as uTransform,
  filter as uFilter
} from './components/Upload'

// Decorators
import MarkdownUploadDecorator from './decorators/MarkdownUpload'

const Form = new EasyForm()

Form.addComponent('select-collection', SelectCollection)
Form.addComponent('checkbox-mc-collection', CheckboxMcCollection)
Form.addComponent('upload', Upload)

Form.addDecorator('markdownUpload', MarkdownUploadDecorator)

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
  PlaceholderDecorator,
  MarkdownUploadDecorator
}
