import { Token } from './token.js'
import { isPrimitive } from './is-primitive/index.js'
import { replaceAll } from './replace.js'

class TokenList {
  constructor() {
    Object.defineProperties(this, {
      tokens: { value: [], writable: true, enumerable: false },
      sets: { value: {}, writable: true, enumerable: true }
    })
  }
  
  replaceAll(content) {
    return replaceAll(content, this.tokens, Token.tags)
  }

  add(...args) {
    this.tokens.push(new Token(...args))
  }
  
  sort() {
    this.tokens = this.tokens.sort((a, b) => a.position - b.position)

    return this
  }
  
  async setPromptAnswers(answers, env) {
    Object.entries(answers).map(isPrimitive)

    const prompted = await Promise.all(
      this.tokens.filter(token => !!answers[token.name])
        .map(token => token.setAnswer(answers[token.name]))
    )
    
    this.tokens = [
      ...prompted,
      ...await Promise.all(
        this.tokens.filter(Token.isComposed)
          .map(token => token.setAnswerFrom(prompted, env))
      )
    ]

    this.sets = this.tokens.reduce((o, t) => ({ ...o, [t.name]: t.value }), {})
    
    return this
  }
  
  getPrompts(env) {
    return Promise.all(
      this.tokens
        .filter(Token.prompts)
        .map(token => token.getPrompt(env))
    )
  }
}

export { TokenList }
