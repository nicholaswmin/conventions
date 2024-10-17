import { join } from 'node:path'

import { createTokens } from './src/tokenizer/index.js'
import { createRepo } from './src/builder/index.js'
import { createApi, handleError } from './src/github-api/index.js'

const dir = import.meta.dirname

const tokens = await createTokens({ dir: join(dir, 'user/tokens') })
const reposr = await createRepo({ dir: join(dir, 'user/conventions'), tokens })
const github = await createApi({ dir: join(dir, 'user/extensions') }, { 
  name: 'sample-repo',
  author: 'nicholaswmin'
})


/*
// The API needs
// - Uploadable Documents
// - Rulesets
try {
  const results = {
    ...await api.repos.createOrOverwrite({ 
      description: 'A repo autocreated by gh-good-repo',
      coverage: 95,
      keywords: ['sample', 'repo'],
      node_version: '22', license: 'MIT' 
    }),
    pages: await api.repos.createPagesSite({ branch: 'main' }),
    documents: await api.repos.addDocuments([
      await fs.getDocument('README.md'),
      await fs.getDocument('package.json'),

      await fs.getDocument('src/index.js'),
      await fs.getDocument('test/greet/args.test.js'),
      await fs.getDocument('test/greet/greet.test.js'),

      ...await fs.getDirDocuments('.github'),
      ...await fs.getDirDocuments('.github/workflows'),
    ].map(doc => doc.replacePlaceholders(api.repo.tokens))),
    //rulesets: await api.repos.addRulesets(await fs.getRulesets()),
    v_report: await api.repos.enablePrivateVulnerabilityReporting(),
    cq_scans: await api.codeScanning.turnOnDefaultSetup()
  } 
  
  Object.entries(results).forEach(([key, value]) => {
    if (Array.isArray(value))
      value.forEach(({ name, status }) => console.log(key, name, status))
    else 
      console.log(key, value.status)
  })
} catch (err) {
  await handleError(err)

  throw err
}
*/
