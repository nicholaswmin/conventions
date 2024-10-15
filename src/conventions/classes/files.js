import { extname } from 'node:path'
import { mergeMarkdown } from './utils/markdown/index.js'

class FileGroup {
  constructor(file) {
    this.path = file.path
    this.name = file.name
    this.content = file.content
    this.files = [file]
  }
  
  add(file) {
    this.files.push(file)
    
    return this
  }
  
  merge() {
    const last = this.files.at(-1)
    const merged = this.files.reduce((content, file, i) => {
      if (i > 0)
        console.log('-', this.name, 'merged:', this.files.map(f => f.convention))

      return file.merge(content)
    }, this.files.at(0).content)
    
    return new last.constructor(last, merged)
  }
}

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
    
    // @TODO throw if remaining placeholders 

    return this
  }
  
  merge(content) {
    return content  
  }
  
  static matches({ name, parentPath }) {
    return true
  }
}

class Ruleset extends File { 
  static matches({ name, parentPath }) {
    return parentPath.endsWith('rulesets') && extname(name).includes('json')
  }
}

class JSON extends File { 
  static matches({ name, parentPath }) {
    return extname(name).includes('json')
  }
}

class Document extends File {  
  static matches({ name, parentPath }) {
    return extname(name).includes('md')
  }
  
  merge(content) {
    return mergeMarkdown([content, this.content])
  }

  toUploadable() {
    return {
      path: this.path,
      content: Buffer.from(this.content)
        .toString('base64')
    }
  }
  
  toCommitMessage() {
    return `docs: add ${this.name}`
  }
}


export { FileGroup, File, Document, Ruleset, JSON }
