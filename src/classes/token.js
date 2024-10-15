class Token { 
  constructor(key, value) {
    this.key = key.trim().split('_').join('-')
    this.value = Array.isArray(value) ? value.map(v => `"${v}"`) : value
    this.openingTag = '<<'
    this.closingTag = '>>'
  }
  
  get placeholder() {
    return `${this.openingTag}${this.key}${this.closingTag}`
  }
}

export { Token }
