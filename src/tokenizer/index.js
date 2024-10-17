import { join } from 'node:path'
import { readdir } from 'node:fs/promises'

import * as promptsdef from 'prompts'
import { TokenList, Token, CompositeToken } from './classes/index.js'

const prompts = promptsdef.default

const loadTokens = async ({ dir }) => {
  const readOptions = { withFileTypes: true }
  const isDirectory = dirent => dirent.isDirectory()
  const directories = (await readdir(dir, readOptions)).filter(isDirectory)
  
  const list = new TokenList()

  for (const { parentPath, name } of directories)
    list.add((await import(join(parentPath, name, 'index.js') )).default)

  return list
}

const createTokens = async ({ dir }) => {
  const tokens = await loadTokens({ dir })
  const questions = await tokens.getPromptQuestions()
  
  return tokens.setPromptAnswers(await prompts(questions))
}

export { Token, CompositeToken, createTokens }
