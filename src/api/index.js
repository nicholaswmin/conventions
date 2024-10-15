import { Api } from './api.js'
import { createOctokitRest, handleApiError } from './octokit.js'

const createApi = async (extDirpath, { name, author }) => {
  return (new Api(await createOctokitRest(), { name, author })).init(extDirpath)
}

export { createApi, handleApiError }
