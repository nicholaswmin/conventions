import * as fs from 'node:fs/promises'
import { styleText } from 'node:util'
import { join } from 'node:path'

import { createTokens } from './src/tokenizer/index.js'
import { createRepo } from './src/builder/index.js'
import { createApi } from './src/github-api/index.js'

try {
  const userdir = join(import.meta.dirname, './usr')
  const tempdir = join(import.meta.dirname, './tmp')
  
  const github = await createApi({ dir: join(userdir, 'extensions') })
  
  const tokens = await createTokens({ dir: join(userdir, 'tokens'), 
    env: { user: github.user, fetch, fs },
  })
  
  const cvrepo = await createRepo(
    { tempdir, dir: join(userdir, 'conventions') }, { tokens }
  ) 
  /*
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
  */
} catch (err) {
  console.error(styleText('red', err.constructor.name + ': ' + err.message))
  console.log(err.stack)
  
  setTimeout(() => process.exit(1), 10)
}
