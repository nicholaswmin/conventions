import { loadDirModules } from './ext-loader.js'
import { Repo } from '../classes/repo.js'

class Api {
  constructor(api, { name, author }) {
    this.api = api
    this.repo = new Repo({ name, author })
  }
  
  async init(dir) {
    await this.#loadExtensions(dir)

    // @TODO
    // - get repo author (not always user) and: 
    // `repo.setAuthor({ author })`

    // @TODO
    // - get repo details (if exists) and: 
    // `repo.setDetails({ descriptions, node_version, ... })`
    return this
  }
  
  async #loadExtensions(dir) {
    ;(await loadDirModules(dir))
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
