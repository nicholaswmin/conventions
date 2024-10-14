import * as qs from 'node:querystring'
import { execFile as execFileCB } from 'node:child_process'
import { promisify } from 'node:util'
import { Octokit } from '@octokit/rest'

const execFile = promisify(execFileCB)

const config = {
  token: {
    url: 'https://github.com/settings/tokens/new',
    scopes: ['repo', 'workflow', 'write:packages', 'delete_repo'],
    name: 'GITHUB_TOKEN'
  },

  editEnvCmd: 'sudo nano /etc/environment',
  srcEnvCmd: 'source /etc/environment'
}

const getOctokitRest = async () => {
  return (new Octokit({ auth: await getToken() })).rest
}

const handleAPIError = async err => {
  if (!err.status)
    return null
  
  if  (err.status === 401)
    await refreshToken() 
  
  const { status, response } = err

  console.error('HTTP Status:', status, response.data.message)
  
  if (response.data.errors)
    response.data.errors.forEach(error => console.log('\n', error))
  
  process.exit(1)
}

const getToken = async () => {
  const token = process.env[config.token.name]

  if (!token) {
    console.warn(`Missing ${config.token.name} token`)

    await newTokenPage()
    
    process.exit(1)
  }

  return token
}

const refreshToken = async () => {
  console.warn(`Expired ${config.token.name} token, must be updated`)

  return await newTokenPage()
}

const newTokenPage = async () => {
  ;[
    'Opened a "Create Token" page:',
    '- Select expiration, click "Generate Token" & copy token to clipboard',
    `- Run: ${config.editEnvCmd.trim()}`,
    `- Add: export ${config.token.name.trim()}=<replace-with-token>`,
    `- Save, then run: ${config.srcEnvCmd.trim()}`
  ].forEach(line => console.log(line))

  const url = `${config.token.url}?${qs.stringify({ 
    description: `for: ${await getPackageName()}`, 
    scopes: config.token.scopes.map(scope => scope.trim()).join(',') 
  })}`

  const out = await execFile('open', [ url ])
  
  if (out.stderr.trim())
    throw Error(out.stderr.trim())
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


export { getOctokitRest, handleAPIError }
