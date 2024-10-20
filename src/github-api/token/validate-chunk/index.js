const keys = ['machine', 'login', 'password']

class ValidationError extends Error {
  constructor(message, lineNo) {
    super(`Line: ${lineNo} ${message}`)
  }
}

const validateLine = (line, i) => {
  const key = keys[i]
  const trimmed = line.trim()
  const condenced = trimmed.replace(/ {2,}/g,' ')  
  const lowerCase = condenced.toLowerCase()
  const split = condenced.split(' ')
  const format = `Expected format: ${key} <value>`
  
  if (typeof condenced !== 'string')
    throw new ValidationError(`has type: ${typeof line}. Must be: string`, i)    
  
  if (!condenced.includes(key) && !lowerCase.includes(key))
    throw new ValidationError(`no matching ${key}. ${format}`, i)    
  
  if (!condenced.includes(key) && lowerCase.includes(key))
    throw new ValidationError(`${key} not lowercase. ${format}`, i)    
  
  if (split.length === 1 && split[0].toLowerCase() === key)
    throw new ValidationError(`${key} has no value. ${format}`, i)    

  if (split.length === 1)
    throw new ValidationError(`no space between ${key} & <value>. ${format}`, i)    

  if (split.length > 2)
    throw new ValidationError(`multiple spaces ${key} & <value>. ${format}`, i)    
  
  return condenced
}

const validateChunk = lines => {
  if (!Array.isArray(lines))
    throw new TypeError(`arg: lines is a ${typeof lines}. Must be: array`)
  
  if (lines.length !== 3)
    throw new RangeError(`arg: lines has ${lines.length} lines. Must have 3.`)
  
  return lines.map(validateLine)
}

export { validateChunk }
