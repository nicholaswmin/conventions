import { Token } from '../token/index.js'

class File {
  constructor({ name, path, convention }, content) {
    Object.defineProperties(this, {
      name:       { value: name,       enumerable: true },
      path:       { value: path,       enumerable: true },
      convention: { value: convention, enumerable: true },
      content:    { value: content,    enumerable: true, writable: true },
    })
  }
  
  replacePlaceholders(tokens = []) {
    this.content = tokens.reduce((replaced, token) => replaced.replaceAll(
      token.placeholder, token.value
    ), this.content)
    
    Token.getTags().forEach(this.throwIfContentIncludes.bind(this))

    return this
  }
  
  throwIfContentIncludes(tag) {
    if (!this.content.includes(tag))
      return false

    throw Error(`${this.name} still contains unreplaced tag: ${tag}`)
  }
  
  static matches({ name, parentPath }) {
    return true
  }
}

class MergeableFile extends File {
  // must be implemented by subclass
  merge(acc, content) {
    console.warn('not implemented')
  }
}

class UploadableFile extends MergeableFile {
  toUploadable() {
    return {
      path: this.path,
      content: Buffer.from(this.content).toString('base64')
    }
  }
  
  toCommitMessage() {
    return `build: add ${this.name}`
  }
}

export { File, UploadableFile, MergeableFile }
