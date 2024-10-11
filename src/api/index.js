import { join } from 'node:path'
import { readdir } from 'node:fs/promises'
import { Api } from './api.js'

const getExtensionFilenames = async dirpath => {
  const listed = await readdir(dirpath, {  withFileTypes: true })
  const hasExtension = item => ['.js', '.mjs'].some(ext => item.name.endsWith(ext))
  const isECMAScript = item => !item.isDirectory() && hasExtension(item)

  return listed.filter(isECMAScript).map(item => item.name)
}

const createApi = async ({ extpath }, { name }) => {
  const api = new Api({ name })

  for (const filename of await getExtensionFilenames(extpath))
    api.register((await import(join(extpath, filename))).default)

  return api.auth()
}

export { createApi }
