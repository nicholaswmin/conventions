import * as qs from 'node:querystring'
import { execFile as execFileCB } from 'node:child_process'
import { promisify } from 'node:util'
import { Octokit } from '@octokit/rest'
import { retry } from '@octokit/plugin-retry'

const CONFIG = {
  TOKEN: {
    URL: 'https://github.com/settings/tokens/new',
    NAME: 'GITHUB_TOKEN',
    SCOPES: ['repo', 'workflow', 'write:packages', 'delete_repo'],
    INSTRUCTIONS: [
      'Opened a "Create Token" page:',
      '- Select expiration, click "Generate Token" & copy token to clipboard',
      `- Run: sudo nano /etc/environment`,
      `- Add: export GITHUB_TOKEN=<replace-with-token>`,
      `- Save, then run: source /etc/environment`
    ]
  }
}

const execFile = promisify(execFileCB)
const RetryOctokit = Octokit.plugin(retry)

const createOctokitRest = async () => (new RetryOctokit({ 
  auth: await getToken(),
  retry: { doNotRetry: [401, 404] },
  request: { retries: 1, retryAfter: 1 }
})).rest

const handleError = async err => {
  if (!err.status)
    return err
  
  const { status, response } = err
  const { data } = response

  if  (status === 401)
    await refreshToken() 

  console.error('HTTP Status:', status, data?.message)
  
  if (data?.errors)
    data.errors.forEach(error => console.log(error))
  
  process.exit(1)
}

const getToken = async () => {
  const token = process.env[CONFIG.TOKEN.NAME]

  if (token)
    return token
  
  console.warn(`Missing ${CONFIG.TOKEN.NAME} token`)

  await newTokenPage()

  process.exit(1)
}

const refreshToken = async () => {
  console.warn(`Expired ${CONFIG.TOKEN.NAME} token, must be updated`)

  return await newTokenPage()
}

const newTokenPage = async () => {
  const out = await execFile('open', [ `${CONFIG.TOKEN.URL}?${qs.stringify({ 
    description: `for: ${await getPackageName()}`, 
    scopes: CONFIG.TOKEN.SCOPES.map(scope => scope.trim()).join(',') 
  })}` ])
  
  if (out.stderr.trim())
    throw Error(out.stderr.trim())
  
  CONFIG.TOKEN.INSTRUCTIONS.forEach(line => console.log(line))
}

const getPackageName = async () => {
  try {
    const out = await execFile('npm', ['pkg', 'get', 'name'])
    const sanitize = str => ['"', '\n'].reduce((acc, char) => 
      acc.replaceAll(char, ''), str)

    if (out.stderr.trim())
      throw Error(out.trim())
    
    return sanitize(out.stdout.trim())
  } catch (err) {
    console.error(err)
    console.warn('Cannot resolve package name, using fallback')
    
    return 'CLI app'
  }
}


export { createOctokitRest, handleError }
