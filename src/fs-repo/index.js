import { join } from 'node:path'
import { readdir, readFile } from 'node:fs/promises'
import { Document } from '../classes/document.js'
import { Ruleset } from '../classes/ruleset.js'

const baseDirname = 'repo'
const baseDirpath = join(process.cwd(), baseDirname)

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
  const files = await getFilesInDir(join(DIRPATH, './rulesets'))
  
  return files.map(file => new Ruleset(file))
}

const getDocuments = async dirpath => {
  const files = await getFilesInDir(join(DIRPATH, dirpath))

  return files.map(file => new Document({ dirpath, ...file }))
}

const getDocument = async path => {
  const contents = await readFile(join(DIRPATH, path), 'utf8')
  const pathparts = path.split('/')
  
  return new Document({ 
    dirpath: pathparts.slice(0, pathparts.length - 1).join('/'), 
    filename: pathparts.at(-1), 
    contents 
  })
}

export { getDocument, getDocuments, getRulesets }
