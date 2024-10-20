import { Octokit } from '@octokit/rest'
import { retry } from '@octokit/plugin-retry'
import { onError, onResponse } from './hooks.js'

const getToken = async () => {
  const token = process.env['GITHUB_TOKEN']

  if (!token || !token.trim().length)
    throw Error(`Missing (or empty) env. var: "GITHUB_TOKEN"`)

  return token.trim()
}

const createOctokitRest = async () => {
  // req. token scopes: 'repo', 'workflow', 'write:packages', 'delete_repo'

  const octokit = new (Octokit.plugin(retry))({ 
    auth: await getToken(),
    retry: { doNotRetry: [401, 404] },
    request: { retries: 1, retryAfter: 1 }
  })
  
  octokit.hook.error('request', onError)
  octokit.hook.after('request', onResponse)

  return octokit.rest
}

export { createOctokitRest }
