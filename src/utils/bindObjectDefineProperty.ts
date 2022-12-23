export const bindObjectDefineProperty = <
  O extends Record<PropertyKey, any> = Record<PropertyKey, any>,
  B extends Record<PropertyKey, any> = Record<PropertyKey, any>
>(
  obj: O,
  property: B
): void => {
  for (const k in property) {
    Object.defineProperty(obj, k, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: property[k]
    })
  }
}
