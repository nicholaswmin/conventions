  class ReplacementError extends Error {}
  
  const replaceAll = (content, tokens, tags) => {
    return validateReplacements(replaceTokens(content, tokens), tags)
  }
  
  const replaceTokens = (content, tokens) => {
    return tokens.reduce(replace, content)
  }
  
  const replace = (replaced, token) => {
    return typeof token.value === 'object' 
      ? token.toReplacements(token.value).reduce(replace, replaced)
      : replaced.replaceAll(
        token.replacement.placeholder, 
        token.replacement.value
      )
  }
  
  const isIsolated = tags => placeholder => 
    placeholder.split(tags.open).length - 1 === 1 && 
      placeholder.split(tags.close).length - 1 === 1
  
  const getPlaceholders = (content, tags) => {
    return content.match(new RegExp(tags.open + `(.*)` + tags.close, 'g')) || []
      .filter(isIsolated(tags))
  }
  
  const validateReplacements = (content, tags) => {
    const remaining = getPlaceholders(content, tags)

    if (remaining.length)
      throw new ReplacementError(`no token found for: ${remaining.join(', ')}`)
    
    // @TODO also throw on unclosed or unopened tags
    // @TODO also throw if a complex object has simple placeholder (w/o a ".")
    return content
  }
  
  export { replaceAll }
