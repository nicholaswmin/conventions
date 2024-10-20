import { Prompt } from './prompt.js'

class Token { 
  static get tags() { return { open: '<<', close: '>>' } }

  constructor(name, { position = Infinity, prompt = null, composes = null }) {
    Object.defineProperties(this, {
      name: { value: name, enumerable: true },
      value: { value: null, configurable: true, enumerable: true },
      
      position: { value: position, enumerable: false },
      composes: { value: composes, enumerable: false },
      prompt: { value: prompt, enumerable: false }
    })
  }

  async getPrompt(env) {
    return new Prompt(this.name, await this.prompt(env))
  }
  
  async setAnswer(answer) {
    Object.defineProperty(this, 'value', { value: answer })
    
    return this
  }

  async setAnswerFrom(tokens, env) {    
    return this.setAnswer(await this.composes(
      Object.fromEntries(tokens.map(token => token.#toEntry())), env
    ))
  }
  
  get replacement() {
    return this.toReplacement([this.name], this.value)
  }
  
  toReplacement(keys, value) {
    return {
      placeholder: Token.placeholderFromKeys(keys),
      value: value
    }
  }

  toReplacements(object) {
    return Object.keys(object).map(key => ({
      replacement: this.toReplacement([this.name, key], object[key])
    }))
  }
  
  #toEntry() {
    return [this.name, this.value]
  }
  
  static placeholderFromKeys(keys) {
    return `${Token.tags.open}${keys.join('.')}${Token.tags.close}`
  }

  static prompts(token) {
    return !!token.prompt
  }
  
  static isComposed(token) {
    return !!token.composes
  }

  static includedIn(answers) {
    return token => !!answers[token.name]
  }
}

export { Token }
