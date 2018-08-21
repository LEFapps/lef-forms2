

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

export default components
