import { extname } from 'node:path'
import { mergeMarkdown } from '../utils/markdown/index.js'
import { mergeJSON } from '../utils/json/index.js'
import { Token } from '../../classes/token.js'

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
    const files = this.files.filter(file => file instanceof MergeableFile)
    
    if (!files.length)
      return this.files.at(0)

    const base  = files.at(0)
    const acc   = files.slice(1).reduce((acc, file) => 
      base.merge(acc, file.content), base.content)
    
    return new base.constructor(base, acc)
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


class Ruleset extends File { 
  static matches({ name, parentPath }) {
    return parentPath.endsWith('rulesets') && extname(name).includes('json')
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


export { FileGroup, File, MergeableFile, Document, Ruleset, JSONFile }
