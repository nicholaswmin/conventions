class Document {
  static localDirpath = 'repo'
  static get localDirname() {
    return Document.localDirpath.split('/').at(-1)
  }

  constructor({ dirpath, filename, contents }) {
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
    const parts = this.dirpath.split('/')
    const index = parts.indexOf(Document.localDirname)
    const rpath = `${parts.slice(index + 1).join('/')}/${this.filename}`
    
    return rpath.startsWith('/') ? rpath.slice(1) : rpath
  }
}

export { Document }
