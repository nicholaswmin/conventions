class Ruleset {
  constructor({ contents }) {
    Object.assign(this, JSON.parse(contents))
  }
  
  toJSON() {
    return { contents: this }
  }
}

export { Ruleset }
