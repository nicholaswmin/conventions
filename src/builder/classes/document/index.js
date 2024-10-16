import { extname } from 'node:path'

import { UploadableFile } from '../file/index.js'
import { mergeMarkdown } from './merge-md/index.js'

class Document extends UploadableFile {  
  static matches({ name, parentPath }) {
    return extname(name).includes('md')
  }
  
  merge(acc, content) {
    return mergeMarkdown([acc, content])
  }
  
  toCommitMessage() {
    return `docs: add ${this.name}`
  }
}

export { Document }
