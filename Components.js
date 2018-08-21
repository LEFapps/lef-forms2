

const config = [
  {
    name: 'textarea',
    path: './components/Textarea'
  },
  {
    name: 'text',
    path: './components/Textarea'
  }
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
