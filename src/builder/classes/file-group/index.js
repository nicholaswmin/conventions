import { MergeableFile } from '../file/index.js' 

class FileGroup {
  constructor(file) {
    this.path = file.path
    this.name = file.name
    this.content = file.content
    this.files = [file]
  }
  
  add(file) {
    this.files.push(file)
    
    return this
  }
  
  merge() {
    const files = this.files.filter(file => file instanceof MergeableFile)
    
    if (!files.length)
      return this.files.at(0)

    const base  = files.at(0)
    const acc   = files.slice(1).reduce((acc, file) => 
      base.merge(acc, file.content), base.content)
    
    return new base.constructor(base, acc)
  }
}

export { FileGroup }
