import { join } from 'node:path'
import { readdir, readFile } from 'node:fs/promises'
import { Document } from '../classes/document.js'
import { Ruleset } from '../classes/ruleset.js'

const BASE_DIRPATH = join(process.cwd(), 'repo')

const getFilenamesInDir = async dirpath => {
  const listed = await readdir(dirpath, {  withFileTypes: true })
  const isFile = item => !item.isDirectory()
  const toName = item => item.name
  
  return listed.filter(isFile).map(toName) 
}

const getFilesInDir = async dirpath => {
  const files = []

  for (const filename of await getFilenamesInDir(dirpath))
    files.push({ 
      filename,
      contents: await readFile(join(dirpath, filename), 'utf8')
    })
  
  return files
}

const getRulesets = async () => {
  const files = await getFilesInDir(join(BASE_DIRPATH, './rulesets'))
  
  return files.map(file => new Ruleset(file))
}

const getDirDocuments = async dirpath => {
  const files = await getFilesInDir(join(BASE_DIRPATH, dirpath))

  return files.map(file => new Document({ 
    baseDirpath: BASE_DIRPATH, 
    dirpath, 
    ...file 
  }))
}

const getDocument = async path => {
  const contents = await readFile(join(BASE_DIRPATH, path), 'utf8')
  const pathparts = path.split('/')
  
  return new Document({ 
    baseDirpath: BASE_DIRPATH,
    dirpath: pathparts.slice(0, pathparts.length - 1).join('/'), 
    filename: pathparts.at(-1), 
    contents 
  })
}

export { getDocument, getDirDocuments, getRulesets }
