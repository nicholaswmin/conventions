import { platform } from 'node:os'
import { grepChunkFromNetRC } from './grep/index.js'
import { findstrChunkFromNetRC } from './findstr/index.js'

const readChunkFromNetRC = async () => {
  return platform() !== 'win32' 
    ? await grepChunkFromNetRC()
    : await findstrChunkFromNetRC() 
}

export { readChunkFromNetRC }
