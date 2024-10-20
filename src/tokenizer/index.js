import { join } from 'node:path'
import { readdir } from 'node:fs/promises'
import * as Prompts from 'prompts'

import { TokenList } from './classes/token-list.js'

class UserAbortError extends Error {}

const loadTokens = async ({ dir }) => {
  const isDirectory  = dirent => dirent.isDirectory()
  const importESM    = path => import(join(path, 'index.js'))
  const readOptions  = { withFileTypes: true }
  const directories  = (await readdir(dir, readOptions)).filter(isDirectory)
  
  const list = new TokenList()

  for (const { parentPath, name } of directories)
    list.add(name, (await importESM(join(parentPath, name))).default())

  return list.sort()
}

const createTokens = async ({ dir, env }) => {
  const tokens = await loadTokens({ dir })
  const prompts = await tokens.getPrompts(env)
  const answers = await Prompts.default(prompts, {
    onCancel: prompt => {
      throw new UserAbortError('User cancelled prompt')
    }
  })
  
  return tokens.setPromptAnswers(answers, env)
}

const createTestTokens = injected => {
  if (process.env.NODE_ENV !== 'test')
    throw new Error('Cannot be called unless `NODE_ENV=test`')

  Prompts.default.inject(injected)

  return async (...args) => await createTokens(...args)
}

export { createTokens, createTestTokens }
