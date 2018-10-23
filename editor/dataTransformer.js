import { isArray, kebabCase } from 'lodash'

const prepareSelect = (element, saving) => {
  if (saving) {
    element.optionNames = element.optionNames.split('\n')
    element.options = element.optionNames.map(o => `~${kebabCase(o)}`)
  } else {
    if (isArray(element.optionNames)) {
      element.options = element.optionNames.map(o => `~${kebabCase(o)}`)
      element.optionNames = element.optionNames.join('\n')
    }
  }
  return element
}

const transformOnType = (element, saving) => {
  switch (element.type) {
    case 'select':
      element = prepareSelect(element, saving)
      break
  }
  return element
}

const transformOnDependency = (element, saving) => {
  // if (element.depends) {
  //   case 'select':
  //     element = prepareSelect(element)
  //     break;
  // }
  return element
}

const prepare = (element, saving = true) => {
  let prepared = element
  prepared = transformOnType(prepared, saving)
  // prepared = transformOnDependency(prepared, saving)
  return prepared
}

const prepareForEditor = element => prepare(element, false)
const prepareForSaving = element => prepare(element, true)

export { prepareForEditor, prepareForSaving }
