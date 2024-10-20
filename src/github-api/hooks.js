import { styleText } from 'node:util'

// @TODO use octokit logging methods
const lbl = {
  err: str => styleText('yellow', 'API: ' + str),
  warn: str => styleText('yellow', 'API: ' + str),
  info: str => styleText('blueBright', 'API: ' + str),
  success: str => styleText('green', 'API: ' + str)
}

class GithubApiError extends Error {
  constructor({ method, url } = {}, { status, data } = {}) {
    super(`${method} ${url} ${status || ''}. ${data?.message || ''}`)
  }
}

const onRequest = async ({ method, url }) => {
  return console.info(lbl.info(`Request: ${method} ${url}`), '\n')
}

const onResponse = async ({ status } = {}, { method, url } = {}) => {
  // guard in case error is not thrown in `onError` hook 
  return status 
    ? console.info(lbl.success(`${method} ${url}: ${status}`), '\n')
    : console.warn('Skipping onResponse logging. No response provided.')
}

const onError = async (err, { method, url }) => {
  // @TODO no idea what this is, copied from Github Docs, whats `findInCache` ?
  // if (err.status === 304)
  //   return findInCache(err.response.headers.etag)
  
  if (err.response)
    throw new GithubApiError({ method, url }, err.response)
  else throw err
}

// @TODO these are entirely untested
const onRateLimit = (retryAfter, { method, url, request }, octokit) => {
  console.warn(lbl.warn(`rate-limit exhausted for: ${method} ${url}`))

  // Retry once after hitting a rate limit error, then give up
  if (request.retryCount <= 1) {
    console.info(lbl.info(`Retrying after ${retryAfter} seconds!`))

    return true
  }
}

const onSecondaryRateLimit = (retryAfter, { method, url }, octokit) => {
  // does not retry, only logs a warning
  console.warn(lbl.warn(`hit secondary rate-limit for: ${method} ${url}`))
}

export { onRequest, onResponse, onError, onRateLimit, onSecondaryRateLimit }
