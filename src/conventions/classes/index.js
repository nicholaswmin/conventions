import { join, extname } from 'node:path'

class FileGroup {
  constructor(file) {
    this.path = file.path
    this.name = file.name
    this.content = ''
    this.files = [file]
  }
  
  add(file) {
    this.files.push(file)
    
    return this
  }
  
  merge() {
    const merge = (acc, file) => acc.merge(file)

    this.merged = this.files.reduce(merge)
      
    return this
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
  
  merge(raw) {
    return 'foo'
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
  
  merge(document) {
    // @TODO 
    // - build a pure mergeMarkDown() function
    //   - parse out references
    //   - parse out sections
    // - create new file with distinct sections

    const split = this.content.raw.split('\n')
    const index = split.findIndex(line => line.includes('content-->'))

    split.splice(index - 2, 0, `\n`)
    split.splice(index - 1, 0, document.content.raw)
    
    Object.defineProperty(this.content, 'merged', {
      value: split,
      enumerable: true
    })

    return this
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
}


class ConventionsList {
  constructor(conventions) {
    this.items = [...conventions]
  }
  
  process({ tokens }) {
    const merged = this.mergeFileGroups()
    
    console.log(merged)
  }
  
  mergeFileGroups() {
    return this.reduceToFileGroups().map(group => group.merge())
  }
  
  reduceToFileGroups() {
    const filesToFileGroupsByPath = (filegroups, file) => ({
      ...filegroups, 
      [file.path]: filegroups[file.path] ? 
        filegroups[file.path].add(file) : 
        new FileGroup(file)
    })
    
    const mergeToFileGroups = (acc, convention) => 
      convention.files.reduce(filesToFileGroupsByPath, acc)
    
    return Object.values(this.items.reduce(mergeToFileGroups, {}))
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
    return this.files.filter(file => file instanceof File)
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
