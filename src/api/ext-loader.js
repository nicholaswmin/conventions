import { join } from 'node:path'
import { readdir } from 'node:fs/promises'

const getExtensionFiles = async dir => {
  const hasExtension = name => ['.js', '.mjs'].some(ext => name.endsWith(ext))
  const isECMAFile = item => !item.isDirectory() && hasExtension(item.name)
  
  return (await readdir(dir, { withFileTypes: true })).filter(isECMAFile)
}

const loadDirModules = async dir => {
  const files = await getExtensionFiles(dir)
  const importFile = file => import(join(file.parentPath, file.name))
  const toDefault = mod => mod.default

  return (await Promise.all(files.map(importFile))).map(toDefault)
}

export { loadDirModules }
