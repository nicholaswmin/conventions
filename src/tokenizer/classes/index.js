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

class TokenList {
  constructor() {
    Object.defineProperty(this, 'Tokens', { value: [], writable: true })
  }

  add(token) {
    this.Tokens.push(token)
  }
  
  toArray() {
    this.Tokens = Object.values(this.Tokens)
  }
  
  toObject() {
    this.Tokens = this.Tokens.reduce((acc, T) => ({ 
      ...acc, [T.name]: T 
    }), {})

    return this
  }
  
  sort(sortFn) {
    this.Tokens = this.Tokens.sort(sortFn)

    return this
  }
  
  setPromptAnswers(answers) {
    // @TODO this can be improved, there is a ton 
    // of (probably) unnecessary conversion of one format to another.
    const toEntryToken = key => [key, new this.Tokens[key](answers[key])]

    const tokns = Object.fromEntries(Object.keys(answers).map(toEntryToken))
    const compositedTokns = this.#instantiateCompositeTokens(tokns)
    
    Object.assign(this, { ...tokns, ...compositedTokns })
    
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
  
  #toKeyedValues(tokens) {
    const toKeyValue = (acc, { key, value }) => ({ ...acc, [key]: value })

    return Object.values(tokens).reduce(toKeyValue, {})
  }
  
  #instantiateCompositeTokens(tokens) {
    const instantiate = T => [ T.name, new T(T.from(this.#toKeyedValues(tokens))) ]
    const isComposited = T => Object.getPrototypeOf(T).name === 'CompositeToken'

    return Object.assign({}, tokens, Object.fromEntries(Object.values(this.Tokens)
      .filter(isComposited).map(instantiate)))
  }
}

export { TokenList, Token, CompositeToken }
