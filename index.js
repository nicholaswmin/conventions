import { join } from 'node:path'
import { createApi } from './src/api/index.js'
import { FsRepo } from './src/fs-repo/index.js'

const fsr = new FsRepo({ repoDir: join(import.meta.dirname, './repo') })
const api = await createApi({ 
  extDir: join(import.meta.dirname, './extensions'),
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
      await fsr.getDocument('README.md'),
      ...await fsr.getDirDocuments('.github'),
      ...await fsr.getDirDocuments('.github/workflows'),
    ].map(doc => doc.replaceTokens(api.repo.tokens))),
    rulesets: await api.repos.addRulesets(await fsr.getRulesets()),
    cq_scans: await api.codeScanning.turnOnDefaultSetup(repo),
    v_report: await api.repos.enablePrivateVulnerabilityReporting()
  } 
  
  console.log(results)
} catch (err) {
  throw err.cause || err
}
