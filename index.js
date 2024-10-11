import { join } from 'node:path'
import { createApi } from './src/api/index.js'
import { getDocument, getDocuments, getRulesets } from './src/fs-repo/index.js'

const api = await createApi(
  { extpath: join(import.meta.dirname, 'apis')  },
  { name: 'fsm', description: 'A state machine' }
)

const result = await api.repos.create(
  { description: 'A state machine' }, 
  { node_version: '22.9', license: 'MIT' }
)

const assets = {
  rulesets: await getRulesets(),
  documents: [
    await getDocument('README.md'),
    ...await getDocuments('.github'),
    ...await getDocuments('.github/workflows'),
  ].map(doc => doc.replaceTokens(api.repo.tokens))
}
console.log(assets)
const results = {
  create: result,
  rulesets: await api.repos.addRulesets(assets.rulesets),
  documents: await api.repos.addDocuments(assets.documents),
  CQDefault: await api.codeScanning.turnOnDefaultSetup(repo)
}

console.log(results)
