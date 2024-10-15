const greet = name => {
  if (typeof name === 'undefined')
    throw TypeError(`'name' is required`)

  if (typeof name !== 'string')
    throw TypeError(`'name' must be a string`)
  
  if (!name.length)
    throw RangeError(`'name' cannot be empty`)
  
  return `Hello ${name}`
}

export { greet }
