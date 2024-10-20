class File {
  constructor({ name, path, convention }, content) {
    Object.defineProperties(this, {
      name:       { value: name,       enumerable: true },
      path:       { value: path,       enumerable: true },
      convention: { value: convention, enumerable: true },
      content:    { value: content,    enumerable: true, writable: true },
    })
  }
  
  replaceAll(tokens) {
    try {
      this.content = tokens.replaceAll(this.content)      
    } catch (err) {
      throw Object.assign(err, { 
        message: `${err.message} at path: ${this.path}, of: ${this.convention}.`
      })
    }
  }
  
  static matches({ name, parentPath }) {
    return true
  }
}

class MergeableFile extends File {
  // must be implemented by subclass
  merge(acc, content) {
    console.warn('not implemented')
  }
}

class UploadableFile extends MergeableFile {
  toUploadable() {
    return {
      path: this.path,
      content: Buffer.from(this.content).toString('base64')
    }
  }
  
  toCommitMessage() {
    return `build: add ${this.name}`
  }
}

export { File, UploadableFile, MergeableFile }
