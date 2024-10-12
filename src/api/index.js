import { join } from 'node:path'
import { Api } from './api.js'

const createApi = async ({ token }, { name, author }) => {
  const api = new Api({ token }, { name, author })

  return api.init({ extDirname: join(process.cwd(), 'extensions') })
}

export { createApi }
