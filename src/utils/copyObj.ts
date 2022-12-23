export const copyObj = <O extends Record<PropertyKey, any>>(obj: O): O =>
  JSON.parse(JSON.stringify(obj))
