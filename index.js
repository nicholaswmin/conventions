import { join } from 'node:path'
import { createApi } from './src/api/index.js'
import { getDocument, getDocuments, getRulesets } from './src/fs-repo/index.js'

const api = await createApi(
  { extpath: join(import.meta.dirname, 'apis')  },
  { name: 'fsm' }
)

const created = await api.repos.create(
  { description: 'A state machine' }, 
  { node_version: ['22.9'], license: 'MIT' }
)

const assets = {
  rulesets: await getRulesets(),
  documents: [
    await getDocument('README.md'),
    ...await getDocuments('.github'),
    ...await getDocuments('.github/workflows'),
  ].map(doc => doc.replaceTokens(api.repo.tokens))
}

const results = {
  created: created,
  ruleset: await api.repos.addRulesets(assets.rulesets),
  uploads: await api.repos.addDocuments(assets.documents),
  cq_scan: await api.codeScanning.turnOnDefaultSetup(repo)
}

console.log(results)
