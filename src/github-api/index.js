import { Api } from './api.js'
import { createOctokitRest, handleError } from './octokit.js'

const createApi = async ({ dir }, { name, author }) => {
  return (new Api(await createOctokitRest(), { name, author })).init(dir)
}
export { createApi, handleError }
