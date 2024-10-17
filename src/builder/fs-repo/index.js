import { join, dirname } from 'node:path'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { ConventionsRepo, Convention } from '../classes/index.js'

class FSRepo {
  constructor(dir) {
    this.dir = dir
  }
  
  async get() {
    const conventions = await this.#getAscendingConventions(this.dir)

    for (const convention of conventions) {
      for (const dirent of await this.#getRecursiveFiles(convention.path)) { 
        const path = join(dirent.parentPath, dirent.name)
        const content = await readFile(path, 'utf8')

        convention.addFileFromDirent(dirent, content)
      }
    }

    return new ConventionsRepo(conventions)
  }
  
  async set({ dir }, repo) {
    for (const file of repo.files) {
      const path = join(dir, file.path)
  
      await mkdir(dirname(path), { recursive: true })
      await writeFile(path, file.content) 
    }
  }
  
  async #getAscendingConventions(path) {
    const toConvention = dirent => new Convention(dirent)
    const byAscendingOrder = (a, b) =>  a.order - b.order

    return (await this.#getFlatDirectories(path))
      .map(toConvention) 
      .sort(byAscendingOrder)
  }
  
  async #getFlatDirectories(path) {
    const isDir = dirent => dirent.isDirectory()
    const dirents = await readdir(path, { withFileTypes: true })
    
    return dirents.filter(isDir)
  }
  
  async #getRecursiveFiles(path) {
    const isFile = dirent => !dirent.isDirectory()
    const dirents = await readdir(path, { 
      recursive: true,
      withFileTypes: true
    })
    
    return dirents.filter(isFile)
  }
}

export { FSRepo }
