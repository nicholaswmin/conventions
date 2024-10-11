class Asset {
  static localDirpath = 'repo'
  static get localDirname() {
    return Asset.localDirpath.split('/').at(-1)
  }

  constructor({ dirpath, filename, contents }) {
    this.dirpath = dirpath
    this.contents = contents
    this.filename = filename
  }
  
  toUploadable() {
    return this
  }
  
  toCommitMessage() {
    return `docs: add ${this.filename}`
  }
}

class Document extends Asset {
  toUploadable() {
    return {
      path: this.#toRepositoryDirpath(this.dirpath),
      contents: Buffer.from(this.contents).toString('base64')
    }
  }
  
  replaceTokens(tokens = []) {
    const replaceToken = token =>
      this.contents = this.contents.replaceAll(token.key, token.value)

    tokens.forEach(replaceToken)
    
    return this
  }
  
  #toRepositoryDirpath() {
    const parts = this.dirpath.split('/')
    const index = parts.indexOf(Asset.localDirname)
    const rpath = `${parts.slice(index + 1).join('/')}/${this.filename}`
    
    return rpath.startsWith('/') ? rpath.slice(1) : rpath
  }
}

class Ruleset {
  constructor({ contents }) {
    Object.assign(this, JSON.parse(contents))
  }
  
  toJSON() {
    return { contents: this }
  }
}

export { Asset, Ruleset, Document }
