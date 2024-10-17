import { Token } from '../../../src/tokenizer/index.js'
import { getLatestMajorVersion, getOwnMajorVersion } from './src/node-v.js'

class Node_Version extends Token {
  static get position() { return 5 } 
  static async info() {
    const nodev = {
      own: getOwnMajorVersion(),
      latest: await getLatestMajorVersion() || getOwnMajorVersion()
    }

    return {
      type: 'select',
      description: 'min. supported Node version',
      position: 5,
      warn: 'version is too old',
      choices: Array.from({ length: 7 }, (_, i) => ({
        description: `own: v${nodev.own},\nlatest: v${nodev.latest}`,
        title: nodev.latest - i, 
        value: nodev.latest - i,
        disabled: i > 4
      }))
    }
  }

  static async validate(value) {
    return Number.isSafeInteger(+value) || 'Invalid value'
  }
  
  static transform(value) {
    return value
  }
}

export default Node_Version
