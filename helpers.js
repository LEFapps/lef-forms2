import { reduce, flow, map } from 'lodash'

/*
 * Use this to generate a function that will "decorate" a component library
 * with the specified decorator.
 */

const decorate = (decorator)=> {
  if (typeof decorator != 'function') {
    throw new TypeError('Expected a decorator function')
  }
  return (components)=> {
    return reduce(components,(acc,component,key)=> {
      acc[key] = decorator(component);
      return acc;
    },{})
  }
}

const flowDecorators = (decorators) => flow(map(decorators, decorator => decorate(decorator)))


export { decorate, flowDecorators }
