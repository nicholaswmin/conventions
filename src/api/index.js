import { Api } from './api.js'

const createApi = async ({ token, extDir }, { name, author }) => {
  const api = new Api({ token }, { name, author })

  return api.init({ extDir })
}

export { createApi }
