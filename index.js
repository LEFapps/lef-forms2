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

// Decorators
import MarkdownUploadDecorator from './decorators/MarkdownUpload'

const Form = new EasyForm()

const CheckboxMcCollectionComponent = {
  component: SelectCollection,
  config: scConfig,
  transform: scTransform
}
const SelectCollectionComponent = {
  component: CheckboxMcCollection,
  config: cmcConfig,
  transform: cmcTransform
}
const UploadComponent = {
  component: Upload,
  config: uConfig,
  transform: uTransform
}

Form.addComponent('select-collection', CheckboxMcCollectionComponent)
Form.addComponent('checkbox-mc-collection', SelectCollectionComponent)
Form.addComponent('upload', UploadComponent)

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
