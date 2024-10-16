class Token { 
  static openingTag = '<<'
  static closingTag = '>>'

  constructor(key, value) {
    this.key = key.trim().split('_').join('-')
    this.value = Array.isArray(value) 
      ? value.map(Token.dblquote) 
      : value.trim()
  }
  
  get placeholder() {
    return `${Token.openingTag}${this.key}${Token.closingTag}`
  }
  
  static getTags() {
    return [Token.openingTag, Token.closingTag]
  }
  
  static dblquote(value) {
    return `"${value.trim()}"`
  }
}

export { Token }
