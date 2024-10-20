import { join } from 'node:path'
import { promisify, styleText } from 'node:util'
import { execFile  as execFileAsync } from 'node:child_process'
import { chmod } from 'node:fs/promises'
import { homedir } from 'node:os'

const execFile = promisify(execFileAsync)

const suggestPermissionsCmd = path => {
  console.info(' There is a file permissions error.  ', '\n')
  console.log(styleText('blueBright', '## Possible fix:'), '\n')
  console.info('- You can attempt a fix by running the following:', '\n')
  console.info('  ', 'chmod', '500', path, '\n')
  
  console.log(styleText('blueBright', '## Explanation:'), '\n')
  console.info('- "chmod" sets file permissions.')
  console.info('- "500" sets the permissions to "read & execute only".')
  console.info('- The remainder is the path to the file.', '\n')

  console.info('- Note: You might need elevated permissions to run the above.')
  console.info('  You can attempt running with "sudo <cmd>..."')
  console.info('  but its advisable to avoid doing so, if possible.','\n')
  
  return
}

const filenames = Object.freeze({
  script: 'grep-netrc',
  netrc: '.netrc'
})

const isFilePermissionsError = err => {
  const path = err.path || err.cmd || ''

  return (err && err.code === 'EACCES' || err.code === 126)
    && [filenames.script, filenames.netrc].some(end => path.endsWith(end))
}

const grepChunkFromNetRC = async () => {
  try {
    const netrcEntry = join(import.meta.dirname, filenames.script)

    await chmod(netrcEntry, 0o500)
  
    const { stdout, stderr } = await execFile(netrcEntry, {
      windowsHide: true,
      maxBuffer: 256,
      env: Object.freeze({ NRCPATH: join(homedir(), filenames.netrc) })
    })
  
    if (stderr.length)
      throw new Error(stderr)
  
    return Object.freeze(stdout.trim().split('\n').slice(0, 3)) 
  } catch (err) {
    if (isFilePermissionsError(err)) {
      suggestPermissionsCmd(err.path || err.cmd || '')
      err.suggestedFix = true
    }

    throw err
  }
}

export { grepChunkFromNetRC }
