import { join } from 'node:path'

class Document {
  constructor({ basepath, dirpath, filename, content }) {
    this.replaced = null

    Object.defineProperties(this, {
      basepath: { value: basepath, enumerable: true },
      dirpath:  { value: dirpath,  enumerable: true },
      filename: { value: filename, enumerable: true },
      content:  { value: content,  enumerable: true, writable: true }
    })
  }
  
  toUploadable() {
    return {
      path: this.#toRepositoryDirpath(this.dirpath),
      content: Buffer.from(this.content).toString('base64')
    }
  }
  
  toCommitMessage() {
    return `docs: add ${this.filename}`
  }
  
  replacePlaceholders(tokens = []) {
    const replaceToken = token => 
      this.content = this.content.replaceAll(token.key, token.value)

    tokens.forEach(replaceToken)
    
    // @TODO warn (or throw?) if non-replaced tokens still exist

    return this
  }
  
  #toRepositoryDirpath() {
    return join(this.dirpath.replaceAll(this.basepath, ''), this.filename)
  }
}

export { Document }
