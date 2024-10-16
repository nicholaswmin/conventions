import { extname } from 'node:path'

import { UploadableFile } from '../file/index.js'
import { mergeJSON } from './merge-json/index.js'

class JSONFile extends UploadableFile { 
  constructor({ name, path, convention }, content) {
    super({ name, path, convention }, typeof content === 'object' 
      ? JSON.stringify(content, null, 2) 
      : content)
  }

  static matches({ name, parentPath }) {
    return extname(name).includes('json')
  }
  
  merge(acc, content) {
    return mergeJSON([this.#parse(acc), this.#parse(content)])
  }
  
  #parse(content) {
    return typeof content === 'string' 
      ? JSON.parse(content)
      : content
  }
}

export { JSONFile }
