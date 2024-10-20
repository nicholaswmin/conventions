const parseChunkToEntry = lines => {
  const trim = str => str.trim()
  const condenseWhitespace = str => str.replace(/ {2,}/g,' ')
  const entryFromWhitespace = (acc, line) => {
    const [ key, value ] = line.split(' ')
  
    return { ...acc, [key]: value  }
  }
  
  return Object.freeze(lines
    .map(trim)
    .map(condenseWhitespace)
    .reduce(entryFromWhitespace, {}))
}

export { parseChunkToEntry }
