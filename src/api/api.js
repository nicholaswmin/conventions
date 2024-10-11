import { createOctokit } from './octokit.js'
import { Repo } from './repo.js'

class Api {
  constructor({ name }) {
    const octokit = createOctokit()
    
    this.repo = new Repo({ name })
    this.rest = octokit.rest
  }
  
  async auth() {
    this.repo.setOwner(await this.rest.users.getAuthenticated())
    
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
