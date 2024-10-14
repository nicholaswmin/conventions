import { join } from 'node:path'
import { readdir, readFile } from 'node:fs/promises'
import { Document } from '../classes/document.js'
import { Ruleset } from '../classes/ruleset.js'


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
      content: await readFile(join(dirpath, filename), 'utf8')
    })
  
  return files
}

class FsRepo {
  constructor({ repoDir }) {
    this.repoDir = repoDir
  }
  
  async getRulesets() {
    const files = await getFilesInDir(join(this.repoDir, './rulesets'))
    
    return files.map(file => new Ruleset(file))
  }
  
  async getDirDocuments (dirpath) {
    const files = await getFilesInDir(join(this.repoDir, dirpath))
  
    return files.map(file => new Document({ 
      basepath: this.repoDir, 
      dirpath, 
      ...file 
    }))
  }
  
  async getDocument(path) {
    const pathparts = path.split('/')

    return new Document({ 
      basepath: this.repoDir,
      dirpath:  pathparts.slice(0, pathparts.length - 1).join('/'), 
      filename: pathparts.at(-1), 
      content:  await readFile(join(this.repoDir, path), 'utf8')
    })
  }
}

export { FsRepo }
