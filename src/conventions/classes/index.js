import { join } from 'node:path'
import { filesToTree } from './utils/treeview/index.js'
import {  FileGroup,  File, JSONFile,  Document, Ruleset } from './files.js'

class ConventionsList {
  constructor(conventions) {
    this.conventions = conventions
    this.files = null
  }
  
  toTreeview() {
    return filesToTree(this.files)
  }
  
  process({ tokens }) {
    if (this.files) 
      throw Error('already processed')

    this.conventions = this.#replacePlaceholders(tokens)
    this.files = this.#mergeFileGroups(this.conventions)

    return this
  }
  
  #replacePlaceholders(tokens) {
    return this.conventions.map(conv => conv.replacePlaceholders(tokens))
  }
  
  #mergeFileGroups(conventions) {
    const mergeFilegroup = group => group.merge()

    return this.#conventionsToFilegroups(conventions).map(mergeFilegroup)
  }

  #conventionsToFilegroups(conventions) {
    const groupByPath = (groups, file) => ({
      ...groups, [file.path]: groups[file.path] 
        ? groups[file.path].add(file) 
        : new FileGroup(file)
    })
    
    const mergeConventionGroups = (acc, convention) => 
      convention.files.reduce(groupByPath, acc)
    
    return Object.values(conventions.reduce(mergeConventionGroups, {}))
  }
}

class Convention {
  // order matters: more specific -> default.
  static types = [ Ruleset, Document, JSONFile, File ]

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
      name, 
      path: this.#reducePath(join(parentPath, name)),
      convention: this.name
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
    this.value = Array.isArray(value) ? value.map(v => `"${v}"`) : value
    this.openingTag = '<<'
    this.closingTag = '>>'
  }
  
  get placeholder() {
    return `${this.openingTag}${this.key}${this.closingTag}`
  }
}

export { ConventionsList, Convention, File, Token }
