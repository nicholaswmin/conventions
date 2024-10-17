import { loadDirModules } from './ext-loader.js'

class Api {
  constructor(api) {
    this.api = api
  }
  
  async init(dirpath) {
    await this.#loadExtensions(dirpath)

    // @TODO
    // - get repo author (not always user) and: 
    // `repo.setAuthor({ author })`

    // @TODO
    // - get repo details (if exists) and: 
    // `repo.setDetails({ descriptions, node_version, ... })`
    return this
  }
  
  async #loadExtensions(dirpath) {
    ;(await loadDirModules(dirpath))
      .forEach(this.#registerExtension, this)
    
    return this
  } 
  
  #registerExtension(extension) {
    const name = extension.name
    const methods = Object.entries(extension).filter(this.#isMethod)
    const descriptors = methods.reduce(this.#toMethodDescriptors.bind(this), {})

    Object.defineProperty(this, name, { value: {}, enumerable: true })
    Object.defineProperties(this[name], descriptors)
  }
  
  #isMethod([key, value]) {
    return typeof value === 'function'
  }
  
  #toMethodDescriptors(acc, [key, value]) {
    return { ...acc, [key]: { value: value.bind(this), enumerable: true } }
  }
}

export { Api }
