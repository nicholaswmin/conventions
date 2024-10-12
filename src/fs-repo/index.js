import { join } from 'node:path'
import { readdir, readFile } from 'node:fs/promises'
import { Asset, Document } from '../api/classes/document.js'
import { Ruleset } from '../api/classes/ruleset.js'

Asset.localDirpath = join(import.meta.dirname, '../../repo')

const getFilenamesInDir = async dirpath => {
  const listed = await readdir(dirpath, {  withFileTypes: true })
  const isFile = item => !item.isDirectory()
  const toName = item => item.name
  
  return listed.filter(isFile).map(toName) 
}

const getFilesInDir = async dirpath => {
  const files = []
  const filenames = await getFilenamesInDir(dirpath)

  for (const filename of filenames)
    files.push({ 
      filename,
      contents: await readFile(join(dirpath, filename), 'utf8')
    })
  
  return files
}

const getRulesets = async () => {
  const files = await getFilesInDir(join(Asset.localDirpath, './rulesets'))
  
  return files.map(file => new Ruleset(file))
}

const getDocument = async path => {
  const contents = await readFile(join(Asset.localDirpath, path), 'utf8')
  const pathparts = path.split('/')

  return new Document({ 
    dirpath: pathparts.slice(0, pathparts.length - 1).join('/'), 
    filename: pathparts.at(-1), 
    contents 
  })
}

const getDocuments = async dirpath => {
  const files = await getFilesInDir(join(Asset.localDirpath, dirpath))

  return files.map(file => new Document({ dirpath, ...file }))
}

export { getDocument, getDocuments, getRulesets }
