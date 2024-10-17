import { Token } from '../../../src/tokenizer/index.js'

class Keywords extends Token {
  static get position() { return 6 } 
  static async info() {
    return {
      type: 'list',
      separator: ',',
      description: 'repository keywords'
    }
  }
  
  static async validate(value) { 
    return new RegExp('^[A-Za-z0-9, ]+$').test(value) || 'invalid format'
  }
  
  static transform(value) {
    const toDoubleQuoteLowerCase = value => `"${value.toLowerCase().trim()}"`
    const isNotWhitespace = value => !!value.trim().length

    return value.filter(isNotWhitespace).map(toDoubleQuoteLowerCase)
  }
}

export default Keywords
