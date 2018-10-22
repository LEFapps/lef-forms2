import { map, isArray, isFunction, difference, cloneDeep } from 'lodash'

class Library extends Map {
  /*
   * Created a new Library with a selection of only the supplied keys.
   */
  subset (keys) {
    const knownKeys = Array.from(this.keys())
    const diff = difference(keys, knownKeys)
    if (diff.length > 0) {
      throw new Error(
        `Unknown key(s): ${diff.join(',')} (available: ${knownKeys.join(',')})`
      )
    }
    return new Library(map(keys, k => [k, this.get(k)]))
  }
  /*
   * Create a (deep) clone.
   */
  clone () {
    return cloneDeep(this)
  }
}

const grab = (source, field, test, sourceName) => {
  const obj = source[field]
  if (!test(obj)) {
    throw new TypeError(
      `Expected '${field}' to match ${test.name} in ${sourceName}`
    )
  }
  return obj
}

class DecoratorLibrary extends Library {
  subset (keys) {
    return new DecoratorLibrary(super.subset(keys).entries())
  }
  clone () {
    return new DecoratorLibrary(this.entries())
  }
  apply (componentLibrary) {
    this.forEach((source, sourceKey) => {
      const decorator = grab(source, 'decorator', isFunction, sourceKey)
      const combine = grab(source, 'combine', isFunction, sourceKey)
      const filter = grab(source, 'filter', isFunction, sourceKey)
      const decoratorConfig = grab(source, 'config', isArray, sourceKey)
      componentLibrary.forEach((target, targetKey) => {
        // is this decorator interested?
        if (filter(targetKey)) {
          // apply the decorator
          const originalDisplayName =
            target.component.displayName ||
            target.component.name ||
            'Component'
          target.component = decorator(target.component)
          target.component.displayName = `${sourceKey}(${originalDisplayName})`
          // combine configurations
          const componentConfig = grab(target, 'config', isArray, targetKey)
          target.config = combine(componentConfig, decoratorConfig)
        } else {
          console.log(`${sourceKey} is not interested in ${targetKey}`)
        }
      })
    })
  }
}

export { Library, DecoratorLibrary }
