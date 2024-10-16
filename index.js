import { join } from 'node:path'
import { createRepo } from './src/builder/index.js'
import { createApi, handleApiError } from './src/gh-api/index.js'

const api = await createApi(join(import.meta.dirname, './extensions'), { 
  name: 'sample-repo',
  author: 'nicholaswmin'
})

const repo = await createRepo({
  dir: join(import.meta.dirname, './conventions'),
  tempDir: join(import.meta.dirname, './tmp')
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
  await handleApiError(err)

  throw err
}
*/
