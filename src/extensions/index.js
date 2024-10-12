import { Api } from './api.js'

const createApi = async ({ name }) => {
  const api = new Api({ name })

  return api.init()
}

export { createApi }
