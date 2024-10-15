import { Api } from './api.js'
import { createOctokitRest, handleApiError } from './octokit.js'

const createApi = async (extDir, { name, author }) => {
  return (new Api(await createOctokitRest(), { name, author })).init(extDir)
}

export { createApi, handleApiError }
