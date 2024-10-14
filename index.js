import { join } from 'node:path'
import { createApi } from './src/api/index.js'
import { FsRepo } from './src/fs-repo/index.js'
import { 
  getOctokitRest, 
  handleAPIError 
} from './src/octokit/index.js'

const fsr = new FsRepo({ repoDir: join(import.meta.dirname, './repo') })
const api = await createApi(await getOctokitRest(), { 
  extDir: join(import.meta.dirname, './extensions')
}, { 
  name: 'fsm-repo',
  author: 'nicholaswmin'
})

try {
  const results = {
    ...await api.repos.create({ 
      description: 'A state machine',
      node_version: '22.9', license: 'MIT' 
    }),
    documents: await api.repos.addDocuments([
      await fsr.getDocument('README.md'),
      ...await fsr.getDirDocuments('.github'),
      ...await fsr.getDirDocuments('.github/workflows'),
    ].map(doc => doc.replaceTokens(api.repo.tokens))),
    //rulesets: await api.repos.addRulesets(await fsr.getRulesets()),
    v_report: await api.repos.enablePrivateVulnerabilityReporting(),
    cq_scans: await api.codeScanning.turnOnDefaultSetup()
  } 
  
  Object.entries(results).forEach(([key, value]) => {
    if (Array.isArray(value))
      value.forEach(({ url, status }) => console.log(key, url, status))
    else 
      console.log(key, value.status)
  })
} catch (err) {
  await handleAPIError(err)

  throw err
}
