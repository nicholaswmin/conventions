const primitives = ['string', 'number', 'boolean']

const isPrimitive = ([key, value]) => {
  if (typeof key === 'undefined' || typeof value === 'undefined')
    throw new TypeError('argument is not a valid [key, value] entry')
  
  return typeof value === 'object' && !Array.isArray(value) && value !== null 
    ? Object.entries(value).map(listsObject, [key, value]).map(isPrimitive)
    : invalid(value) ? throwKeyError(key, value) : [key, value]
}

const invalid = value => !primitives.includes(typeof value)

const listsObject = function([key, value]) {
  if (typeof value === 'object')
    return throwDepthError([this[0], key], value)

  return [key, value]
}

const throwDepthError = (keys, value) => 
  throwTypeError(keys.join('.'), value, primitives)

const throwKeyError = (key, value) => 
  throwTypeError(`${key}`, value, [...primitives, 'flat object'])

const throwTypeError = (path, value, allowed) => {
  const type = Array.isArray(value) ? 'array' : typeof value

  throw TypeError(`${path} is type: ${type}. Can be: ${allowed.join(' or ')}.`)
}

export { isPrimitive }
