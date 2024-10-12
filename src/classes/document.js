import { join } from 'node:path'

class Document {
  constructor({ baseDirpath, dirpath, filename, contents }) {
    this.baseDirpath = baseDirpath
    this.dirpath = dirpath
    this.contents = contents
    this.filename = filename
  }
  
  toUploadable() {
    return {
      path: this.#toRepositoryDirpath(this.dirpath),
      contents: Buffer.from(this.contents).toString('base64')
    }
  }
  
  toCommitMessage() {
    return `docs: add ${this.filename}`
  }
  
  replaceTokens(tokens = []) {
    const replaceToken = token =>
      this.contents = this.contents.replaceAll(token.key, token.value)

    tokens.forEach(replaceToken)
    
    // @TODO warn (or throw?) if non-replaced tokens still exist

    return this
  }
  
  #toRepositoryDirpath() {
    return join(this.dirpath.replaceAll(this.baseDirpath, ''), this.filename)
  }
}

export { Document }
