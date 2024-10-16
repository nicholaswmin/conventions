import { extname } from 'node:path'
import { File } from '../file/index.js'

class Ruleset extends File { 
  static matches({ name, parentPath }) {
    return parentPath.endsWith('rulesets') && extname(name).includes('json')
  }
}

export { Ruleset }
