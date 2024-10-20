import { Api } from './api.js'
import { createOctokitRest } from './octokit.js'

const createApi = async ({ dir }) => {
  return (new Api(await createOctokitRest())).init(dir)
}

export { createApi }
