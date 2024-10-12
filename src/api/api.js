import { join } from 'node:path'
import { readdir } from 'node:fs/promises'
import { Octokit } from '@octokit/rest'
import { Repo } from '../classes/repo.js'

const getExtensionFiles = async dirpath => {
  const hasExtension = name => ['.js', '.mjs'].some(ext => name.endsWith(ext))
  const isECMAFile = item => !item.isDirectory() && hasExtension(item.name)
  
  return (await readdir(dirpath, { withFileTypes: true }))
    .filter(isECMAFile)
}

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
    for (const file of await getExtensionFiles(extpath))
      this.#registerExtension(
        (await import(join(file.parentPath, file.name))).default
      )
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
