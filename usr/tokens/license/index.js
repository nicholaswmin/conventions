import { findByLicenseId } from './src/spdx.js'
import { Token } from '../../../src/tokenizer/index.js'

class License extends Token {
  static get position() { return 4 } 
  static async info() {
    return {
      type: 'text',
      description: 'license SPDX ID'
    }
  }

  static async validate(value) {
    return !!findByLicenseId(value)
  }
  
  static transform(value) {
    return value
  }
}

export default License
