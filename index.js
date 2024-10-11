import { join } from 'node:path'
import { Api } from './src/api/index.js'

const api = new Api()
const repo = await api.init(
  { name: 'fsm', description: 'A state machine' }, 
  { engine: '22.9', license: 'MIT' }
)

const assets = {
  rulesets: await getRulesets(),
  documents: [
    await getDocument('README.md'),
    ...await getDocuments('.github'),
    ...await getDocuments('.github/workflows'),
  ].map(doc => doc.replaceTokens(repo.tokens))
}

const results = {
  repo: await api.repos.create(),
  rulesets: await api.repos.addRulesets(assets.rulesets),
  documents: await api.repos.addDocuments(assets.documents),
  CQDefault: await api.codeScanning.turnOnDefaultSetup(repo)
}

console.log(results)
