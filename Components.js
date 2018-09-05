import { Library } from './Library'

const library = new Library([
  [ 'textarea','./components/Textarea' ],
  [ 'text', './components/Text'],
  [ 'checkbox','./components/Checkbox']
])

// replace the paths with components and their config

library.forEach((path,name)=> {
  library.set(name, {
    component: require(path).default,
    config: require(path).config
  })
})

export default library
