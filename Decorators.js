import { applyDecorators } from './helpers'
import { map, difference } from 'lodash'

/* Note: the sequence here determines the sequence 
 * in which they are applied in EasyForm!
 */
const library = new Map([
  [ 'attributes', './decorators/Attributes'],
  [ 'formgroup', './decorators/FormGroup'],
  [ 'layout', './decorators/Layout']
])

library.forEach((path,name)=> {
  library.set(name, {
    decorator: require(path).default,
    config: require(path).config,
    position: require(path).position
  })
})

library.apply = (componentLibrary)=> applyDecorators(library,componentLibrary)

library.subset = (names)=> {
  allDecorators = Array.from(library.keys())
  const diff = difference(names,allDecorators)
  if (diff.length > 0)
    throw new Error(`Unknown decorator(s): ${diff.join(',')} (available: ${allDecorators.join(',')})`)
  return new Map(map(names,(name)=> [name, library.get(name)]))  
}

export default library
