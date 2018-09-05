import { 
  reduce,
  flow,
  map,
  union, 
  flip,
  isArray,
  isFunction,
  stubTrue,
  difference
} from 'lodash'


/*
 * DECORATORS
 */ 

/*
 * Use this to generate a function that will "decorate" a component library
 * with the specified decorator.
 */

const decorate = (decorator)=> {
  if (!isFunction(decorator)) {
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

/*
 * DECORATOR CONFIG
 */

const flowDecoratorConfig = (combine) => (decoratorConfigurations,filter=stubTrue)=> {
  if (!isFunction(combine)) {
    throw new TypeError('Expected `combine` to be a function')
  }
  if (!isArray(decoratorConfigurations)) {
    throw new TypeError('Expected `decoratorConfigurations` to be an array')
  }
  return flow(map(decoratorConfigurations, decoratorConfig => addDecoratorConfig(decoratorConfig,combine,filter)))
}

const flowDecoratorConfigFirst = flowDecoratorConfig(union)
const flowDecoratorConfigLast = flowDecoratorConfig(flip(union))

/**
 * This function modifies the configurations of supported components
 * by adding the config for a label. 
 * `combine` is a function that combines the two supplied arguments:
 * the `decoratorConfig` and the componentConfiguration.
 */
const addDecoratorConfig = (decoratorConfig,combine,filter)=> { 
  return libraryConfiguration => {
    return reduce(libraryConfiguration,
      (acc,componentConfiguration,type)=> {
        if (filter(type)) {
          acc[type] = combine(decoratorConfig,componentConfiguration)
        } else {
          acc[type] = componentConfiguration
        }
        return acc
      }
      ,{})
  }
}

export { 
  decorate, 
  flowDecorators, 
  flowDecoratorConfigFirst, 
  flowDecoratorConfigLast,
  flowDecoratorConfig,
  applyDecorators,
}
