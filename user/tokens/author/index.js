import { Token } from '../../../src/tokenizer/index.js'

class Author extends Token {
  static async info() {
    return {
      type: 'text',
      description: 'repository author'
    }
  }
  
  static async validate(value) { 
    return true
  }
  
  static transform(value) {
    return value.replaceAll('@', '')
  }
}

export default Author
