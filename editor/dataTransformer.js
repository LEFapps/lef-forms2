import { isArray, kebabCase } from 'lodash'

const transformOnType = (element, saving) => {
  switch (element.type) {
    case 'select':
      if (saving) {
        element.optionNames = element.optionNames
          ? element.optionNames.split('\n')
          : []
        element.options = element.optionNames.map(o => `~${kebabCase(o)}`)
      } else {
        if (isArray(element.optionNames)) {
          element.options = element.optionNames.map(o => `~${kebabCase(o)}`)
          element.optionNames = element.optionNames.join('\n')
        }
      }
      break
    case 'select-collection':
      if (saving) {
        delete element.options
        delete element.optionNames
        element.fields = element.fields ? element.fields.split('\n') : []
        element.defaultOptionNames = element.defaultOptionNames
          ? element.defaultOptionNames.split('\n')
          : []
        element.defaultOptions = element.defaultOptionNames.map(
          o => `~${kebabCase(o)}`
        )
      } else {
        if (isArray(element.defaultOptionNames)) {
          element.defaultOptions = element.defaultOptionNames.map(
            o => `~${kebabCase(o)}`
          )
          element.defaultOptionNames = element.defaultOptionNames.join('\n')
        }
        if (isArray(element.fields)) element.fields = element.fields.join('\n')
      }
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
