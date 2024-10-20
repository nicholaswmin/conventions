import { Octokit } from '@octokit/rest'
import { retry } from '@octokit/plugin-retry'
import { throttling } from '@octokit/plugin-throttling'

import { 
  onRequest,
  onResponse, 
  onError, 

  onRateLimit, 
  onSecondaryRateLimit 
} from './hooks.js'

const createOctokitRest = async () => {
  // req. token scopes: 'repo', 'workflow', 'write:packages', 'delete_repo'
  const RetryThrottledOctokit = Octokit.plugin(retry, throttling)

  const octokit = new RetryThrottledOctokit({ 
    auth: await getToken(),
    retry: {
      // Github defaults: 400, 401, 403, 404, 422, and 451.
      doNotRetry: [400, 401, 403, 404, 422, 451]
    },
    throttle: { onRateLimit, onSecondaryRateLimit }
  })
  
  octokit.hook.before('request', onRequest)
  octokit.hook.error('request', onError)
  octokit.hook.after('request', onResponse)

  return octokit.rest
}

// @TODO store in `.netrc`
const getToken = async () => {
  const token = process.env['GITHUB_TOKEN']

  if (!token || !token.trim().length)
    throw Error(`Missing (or empty) env. var: "GITHUB_TOKEN"`)

  return token.trim()
}

export { createOctokitRest }
