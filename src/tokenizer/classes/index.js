const isPromptable = T => Object.getPrototypeOf(T).name === 'Token'
const isPromptableEntry = ([_, T]) => isPromptable(T)

class Token { 
  static get openingTag() { return '<<' }
  static get closingTag() { return '>>' }

  constructor(rawValue) {
    Object.defineProperties(this, {
      key: {
        value: this.constructor.name.toLowerCase().split('_').join('-'),
        enumerable: true
      },
      
      value: {
        value: this.constructor.transform(rawValue),
        enumerable: true
      }
    })
  }
  
  get placeholder() {
    return `${Token.openingTag}${this.key}${Token.closingTag}`
  }
  
  static getTags() {
    return [Token.openingTag, Token.closingTag]
  }
}

class CompositeToken extends Token {
  static transform(value) {
    return value
  }
}

class Tokenlist {
  constructor() {
    Object.defineProperty(this, 'Tokens', { 
      value: [], writable: true 
    })
  }
  
  replace(content) {
    return this.tokens.reduce((replaced, token) => replaced.replaceAll(
      token.placeholder, token.value
    ), content)
    
    // @TODO throw if tags still exists
    return this
  }

  add(token) {
    this.Tokens.push(token)
  }
  
  sort(sortFn) {
    this.Tokens = this.Tokens.sort(sortFn)

    return this
  }
  
  setPromptAnswers(answers) {
    const isCompToken = T => Object.getPrototypeOf(T).name === 'CompositeToken'

    const tokens = Object.keys(answers).reduce((acc, key) => {
      const Token = this.Tokens.find(Token => Token.name === key)
      const token = new Token(answers[key])
      return { ...acc, [token.key]: token }
    }, {})

    const compTokens = this.Tokens.filter(isCompToken)
      .reduce((acc, CompToken) => {
        const token = new CompToken(CompToken.from(tokens))
        return { ...acc, [token.key]: token }
      }, {})

    this.tokens = Object.values({ ...tokens, ...compTokens })
    
    return this
  }
  
  getPromptQuestions() {
    const isPromptable = T => Object.getPrototypeOf(T).name === 'Token'
    const promptable = Object.values(this.Tokens).filter(isPromptable)

    return Promise.all(promptable.map(token => {
      return token.info().then(info => {
        const { type, description } = info

        return {
          ...info,
          name: token.name,
          message: (type === 'select' ? 'select ' : 'enter a ') + description,
          validate: token.validate
        }
      })
    }))
  }
}

export { Tokenlist, Token, CompositeToken }
