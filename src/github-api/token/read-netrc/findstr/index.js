import { promisify } from 'node:util'
import { execFile  as execFileAsync } from 'node:child_process'

const execFile = promisify(execFileAsync)
const filenames = Object.freeze({
  // @TODO
})

const suggestPermissionsCmd = path => {
  // @TODO
}

const findstrChunkFromNetRC = async () => {
  // @TODO

  throw new Error('Not implemented')
}

export { findstrChunkFromNetRC }
