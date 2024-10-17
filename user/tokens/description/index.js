import { Token } from '../../../src/tokenizer/index.js'

class Description extends Token {  
  static async info() {
    return {
      type: 'text',
      description: 'repository description'
    }
  }
  
  static async validate(value) { 
    return new RegExp('^[A-Za-z0-9., ]+$').test(value)
  }
  
  static transform(value) {
    return value
  }
}

export default Description
