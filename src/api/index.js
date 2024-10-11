import { join } from 'node:path'
import { readdir } from 'node:fs/promises'
import { Api } from './api.js'

const getApis = async dirpath => {
  const listed = await readdir(dirpath, {  withFileTypes: true })
  const isApi = item => !item.isDirectory() && !item.name.includes('index')
  const toName = item => item.name
  
  return listed.filter(isApi).map(toName) 
}

const createApi = async (dirpath, ...args) => {
  const api = new Api(...args)
  const filenames = await getApis(dirpath)

  for (const filename of filenames) {
    const imported = await import(join(dirpath, filename))
    api.register(imported.default)
  }

  return api
}

export { createApi }
