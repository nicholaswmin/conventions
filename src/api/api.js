import { Octokit } from '@octokit/rest'
import { loadDirModules } from './ext-loader.js'
import { Repo } from '../classes/repo.js'

class Api {
  constructor({ token }, { name, author }) {
    this.rest = (new Octokit({ auth: token })).rest
    this.repo = new Repo({ name, author })
  }
  
  async init({ extDirname }) {
    await this.#loadExtensions(extDirname)

    // @TODO
    // - get repo author (not always user) and: 
    // `repo.setAuthor({ author })`

    // @TODO
    // - get repo details (if exists) and: 
    // `repo.setDetails({ descriptions, node_version, ... })`
    return this
  }
  
  async #loadExtensions(extpath) {
    ;(await loadDirModules(extpath))
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
