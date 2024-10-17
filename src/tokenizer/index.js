import { join } from 'node:path'
import { readdir } from 'node:fs/promises'

import * as promptsdef from 'prompts'
import { TokenList, Token, CompositeToken } from './classes/index.js'

const prompts = promptsdef.default

const loadTokens = async ({ dir }) => {
  const isDirectory  = dirent => dirent.isDirectory()
  const ascendingPos = (a, b) => a.position - b.position
  const readOptions  = { withFileTypes: true }
  const directories  = (await readdir(dir, readOptions)).filter(isDirectory)
  
  const list = new TokenList()

  for (const { parentPath, name } of directories)
    list.add((await import(join(parentPath, name, 'index.js') )).default)

  return list.sort(ascendingPos).toObject()
}

const createTokens = async ({ dir }) => {
  const tokens = await loadTokens({ dir })
  const quests = await tokens.getPromptQuestions()
  
  return tokens.setPromptAnswers(await prompts(quests)).toArray()
}

export { Token, CompositeToken, createTokens }
