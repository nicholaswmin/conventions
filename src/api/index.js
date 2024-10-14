import { Api } from './api.js'

const createApi = async (api, { extDir }, { name, author }) => {
  return (new Api(api, { name, author })).init({ extDir })
}

export { createApi }
