import * as fs from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { mergeMarkdown } from './markdown/index.js'
import { filesToTree } from './treeview/index.js'

const writeFileSyncRecursive = (filename, content = '') => {
  fs.mkdirSync(dirname(filename), { recursive: true })
  fs.writeFileSync(filename, content)
}

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
    const merged = this.files.reduce((content, file) => {
      return file.merge(content)
    }, this.files.at(0).content)
    
    return new last.constructor(last, merged)
  }
}

class File {
  constructor({ name, path }, content) {
    Object.defineProperties(this, {
      name:    { value: name,    enumerable: true },
      path:    { value: path,    enumerable: true },
      content: { value: content, enumerable: true, writable: true },
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


class ConventionsList {
  constructor(conventions) {
    this.conventions = conventions
    this.files = {
      replaced: [],
      merged: []
    }
  }
  
  writeToTmp() {
    const tmp = join(import.meta.dirname, '../../../tmp')
    this.merged.forEach(file => {
      writeFileSyncRecursive(join(tmp, file.path), file.contents)
    })
  }
  
  toTree() {
    return filesToTree(this.files.merged)
  }
  
  search(keyword) {
    return this.files.merged.filter(file => file.name.toLowerCase()
      .includes(keyword.toLowerCase()))
  }
  
  process({ tokens }) {
    this.files.replaced = this.#replacePlaceholders(tokens)
    this.files.merged = this.#mergeFileGroups()

    return this
  }
  
  #replacePlaceholders(tokens) {
    return this.conventions.map(convention => convention.replacePlaceholders(tokens))
  }
  
  #mergeFileGroups() {
    return this.#reduceToFileGroups().map(group => group.merge())
  }

  #reduceToFileGroups() {
    const filesToFileGroupsByPath = (filegroups, file) => ({
      ...filegroups, 
      [file.path]: filegroups[file.path] ? 
        filegroups[file.path].add(file) : 
        new FileGroup(file)
    })
    
    const mergeToFileGroups = (acc, convention) => 
      convention.files.reduce(filesToFileGroupsByPath, acc)
    
    return Object.values(this.files.replaced.reduce(mergeToFileGroups, {}))
  }
}

class Convention {
  static types = [
    Ruleset,
    Document,
    JSON,
    File
  ]

  constructor({ name, parentPath }) {
    Object.defineProperties(this, {
      name:  { value: this.#trimNumericPrefix(name), enumerable: true },
      path:  { value: join(parentPath, name),        enumerable: true },
      order: { value: this.#pickNumericPrefix(name), enumerable: true },
      files: { value: [],                            enumerable: true }
    })
  }
  
  addFileFromDirent({ parentPath, name }, content) {
    const Type = Convention.types.find(t => t.matches({ parentPath, name }))

    this.files.push(new Type({
      name, path: this.#reducePath(join(parentPath, name))
    }, content))
  }
  
  replacePlaceholders(tokens = []) {
    this.files.forEach(file => file.replacePlaceholders(tokens))  
    
    return this
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

export { ConventionsList, Convention, File, Token }
