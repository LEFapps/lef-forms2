

const config = [
  {
    name: 'textarea',
    path: './components/Textarea'
  },
  {
    name: 'text',
    path: './components/Text'
  },
  {
    name: 'checkbox',
    path: './components/Checkbox'
  },
]

let components = {}

for (let component of config) {
  components[component.name] = require(component.path).default
}

let ComponentConfiguration = {}


for (let component of config) {
  ComponentConfiguration[component.name] = require(component.path).config
}

export default components
export { ComponentConfiguration }
