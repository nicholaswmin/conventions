import { Octokit } from '@octokit/rest'

const createOctokit = ({ token }) => {
  return new Octokit({
    throw Error('Missing token')
    // @TODO login properly
    auth: '***',
    throttle: {
      onRateLimit: (retryAfter, { method, url }) => {
        gh.log.warn(`Request quota exhausted for request ${method} ${url}`)
        
        if (options.request.retryCount === 0) {
          // only retries once
          gh.log.info(`Retrying after ${retryAfter} seconds!`)
          return true
        }
      },
      onSecondaryRateLimit: (retryAfter, { method, url }, octokit) => {
        // does not retry, only logs a warning
        gh.log.warn(`Secondary quota detected for request ${method} ${url}`)
      }
    },
    retry: {
      doNotRetry: ['429'],
    },
  })
}

export { createOctokit }
