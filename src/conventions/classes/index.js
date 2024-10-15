import { join, extname } from 'node:path'

class Convention {
  constructor({ name, parentPath }) {
    Object.defineProperties(this, {
      name:  { value: this.#trimNumericPrefix(name), enumerable: true },
      path:  { value: join(parentPath, name),        enumerable: true },
      order: { value: this.#pickNumericPrefix(name), enumerable: true },
      files: { value: [],                            enumerable: true }
    })
  }

  addFile({ name, parentPath }, content) {
    this.files.push(new File({  
      name, path: this.#reducePath(join(parentPath, name))
    }, content))
  }
  
  addDocument({ name, parentPath }, content) {
    this.files.push(new Document({ 
      name, path: this.#reducePath(join(parentPath, name))
    }, content))
  }
  
  replacePlaceholders(tokens = []) {
    return this.files.filter(file => file instanceof Document)
      .forEach(document => document.replacePlaceholders(tokens))  
  }
  
  #pickNumericPrefix(str) {
    const seprt  = '-'
    const parts  = str.split(seprt)
    const prefix = +parts.at(0)
    const hasNumericPrefix = Number.isSafeInteger(prefix)

    return hasNumericPrefix ? prefix : 0
  }
  
  #trimNumericPrefix(str) {
    const seprt  = '-'
    const parts  = str.split(seprt)
    const prefix = +parts.at(0)
    const hasNumericPrefix = Number.isSafeInteger(prefix)

    return parts.slice(hasNumericPrefix ? 1 : 0, parts.length).join(seprt)
  }
  
  #reducePath(path) {
    return path.replace(`${this.path}/`, '')
  }
}

class File {
  constructor({ name, path }, content) {
    Object.defineProperties(this, {
      name:    { value: name, enumerable: true },
      path:    { value: path, enumerable: true },
      content: { value: {},   enumerable: true },
    })
    
    Object.defineProperties(this.content, {
      raw: { value: content, enumerable: true }
    })
  }
  
  static isDocument({ name }) {
    return ['.md'].includes(extname(name))
  }
}

class Document extends File {
  constructor({ path, name }, content) {
    super({ path, name }, content)
  }
  
  toUploadable() {
    return {
      path: this.path,
      content: Buffer.from(this.content.replaced || this.content.raw)
        .toString('base64')
    }
  }
  
  toCommitMessage() {
    return `docs: add ${this.name}`
  }
  
  replacePlaceholders(tokens = []) {
    Object.defineProperty(this.content, 'replaced', {
      value: tokens.reduce((replaced, token) => replaced.replaceAll(
        token.placeholder, token.value
      ), this.content.raw),
      enumerable: true
    })
    
    // @TODO throw if remaining placeholders 

    return this
  }
}

class Token { 
  constructor(key, value) {
    this.key = key.trim().split('_').join('-')
    this.value = value
    this.openingTag = '<<'
    this.closingTag = '>>'
  }
  
  get placeholder() {
    return `${this.openingTag}${this.key}${this.closingTag}`
  }
}

export { Convention, File, Token }
