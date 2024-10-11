import { join } from 'node:path'
import { createApi } from './src/api/index.js'

const api = await createApi(
  join(import.meta.dirname, 'apis'),
  { name: 'fsm', description: 'A state machine' }, 
  { node_version: '22.9', license: 'MIT' }
)

await api.auth()

const assets = {
  rulesets: await getRulesets(),
  documents: [
    await getDocument('README.md'),
    ...await getDocuments('.github'),
    ...await getDocuments('.github/workflows'),
  ].map(doc => doc.replaceTokens(api.settings.tokens))
}

const results = {
  repo: await api.repos.create(),
  rulesets: await api.repos.addRulesets(assets.rulesets),
  documents: await api.repos.addDocuments(assets.documents),
  CQDefault: await api.codeScanning.turnOnDefaultSetup(repo)
}

console.log(results)
