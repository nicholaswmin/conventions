class Ruleset {
  constructor({ content }) {
    Object.assign(this, JSON.parse(content))
  }
  
  toJSON() {
    return { content: this }
  }
}

export { Ruleset }
