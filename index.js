import { join } from 'node:path'
import { createApi } from './src/api/index.js'
import { 
  getRulesets,
  getDocument, 
  getDirDocuments
} from './src/fs-repo/index.js'

const api = await createApi({ 
  token: 'xxx'
}, { 
  name: 'fsm',
  author: 'nicholaswmin'
})

try {
  const results = {
    new_repo: await api.repos.create({ 
      description: 'A state machine',
      node_version: '22.9', license: 'MIT' 
    }),
    documents: await api.repos.addDocuments([
      await getDocument('README.md'),
      ...await getDirDocuments('.github'),
      ...await getDirDocuments('.github/workflows'),
    ].map(doc => doc.replaceTokens(api.repo.tokens))),
    rulesets: await api.repos.addRulesets(await getRulesets()),
    cq_scans: await api.codeScanning.turnOnDefaultSetup(repo),
    v_report: await api.repos.enablePrivateVulnerabilityReporting()
  } 
  
  
  console.log(results)
} catch (err) {
  console.error(err.cause)
}
