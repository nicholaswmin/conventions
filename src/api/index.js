// @TODO @REVIEW,
// whats the point of this?
import { Api } from './api.js'

const createApi = async ({ extpath }, { name }) => {
  const api = new Api({ name })

  return api.init({ extpath })
}

export { createApi }
