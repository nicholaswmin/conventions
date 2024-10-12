import { join } from 'node:path'
import { Api } from './api.js'

const createApi = async ({ name }) => {
  const api = new Api({ name })

  return api.init({ extDirname: join(process.cwd(), 'extensions') })
}

export { createApi }
