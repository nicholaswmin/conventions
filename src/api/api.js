import { createOctokit } from './octokit.js'
import { Settings } from './settings.js'

class Api {
  constructor(...args) {
    const octokit = createOctokit()
    this.rest = octokit.rest
    this.settings = new Settings(...args)
  }
  
  async auth() {
    this.settings.setOwner(await this.rest.users.getAuthenticated())
    
    return this
  }
  
  register(api) {
    Object.defineProperty(this, api.name, { value: {}, enumerable: true })
    Object.defineProperties(this[api.name], Object.entries(api)
      .filter(this.#entryIsFunction, this)
      .reduce(this.#entryToMethodDescriptor.bind(this), {})
    )
  }
  
  #entryIsFunction([key, value]) {
    return typeof value === 'function'
  }
  
  #entryToMethodDescriptor(acc, [key, value]) {
    return { ...acc, [key]: { value: value.bind(this), enumerable: true } }
  }
}

export { Api }
