import { join } from 'node:path'
import { FileGroup, File, JSONF, Document, Ruleset } from './files.js'
import { filesToTree } from './utils/treeview/index.js'

class ConventionsList {
  constructor(conventions) {
    this.conventions = conventions
    this.result = []
  }
  
  toTree() {
    return filesToTree(this.result)
  }
  
  search(keyword) {
    return this.result.filter(file => file.name.toLowerCase()
      .includes(keyword.toLowerCase()))
  }
  
  process({ tokens }) {
    this.#replacePlaceholders(tokens)

    this.result = this.#mergeFileGroups()
    
    return this.result
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
    
    return Object.values(this.conventions.reduce(mergeToFileGroups, {}))
  }
}

class Convention {
  // order matters: more specific -> almost default
  static types = [ Ruleset, Document, JSONF, File ]

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
