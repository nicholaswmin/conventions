import { Token } from '../../../src/tokenizer/index.js'

class Name extends Token {
  static get position() { return 0 } 
  static async info() {
    return {
      type: 'text',
      description: 'repository name'
    }
  }

  static async validate(value) {
    return true
    // test for scoped:     
    // return new RegExp('@[a-z\\d][\\w-.]+/[a-z\\d][\\w-.]*').test(value)
    return /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(value)
  }
  
  static transform(value) {
    return value
  }
}

export default Name
