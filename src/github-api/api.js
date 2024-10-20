import { loadDirModules } from './ext-loader.js'

class User {
  constructor({ username }) {
    // `user` is available `Token.env` so dont mess up
    this.username = username
    
    Object.freeze(this)
  }
  
  static fromData({ data }) {
    return new this({ username: data.login })
  }
}

class Api {
  constructor(api) {
    this.api = api
    this.user = null
  }
  
  async init(dirpath) {
    await this.#loadExtensions(dirpath)

    Object.defineProperty(this, 'user', {
      value: User.fromData(await this.api.users.getAuthenticated()),
      enumerable: true
    })

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
