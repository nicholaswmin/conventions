import { join } from 'node:path'
import { Token } from './src/conventions/classes/index.js'
import { FSConventions, writeRepoToDir } from './src/conventions/fs/index.js'
import { createApi, handleApiError } from './src/api/index.js'


const fsc = new FSConventions(join(import.meta.dirname, './conventions'))
const api = await createApi(join(import.meta.dirname, './extensions'), { 
  name: 'sample-repo',
  author: 'nicholaswmin'
})

const list = await fsc.listAll()

list.process({
  tokens: [
    new Token('name', 'greet'),
    new Token('author', 'johndoe'),
    new Token('description', 'a sample repo'),
    new Token('author_url', 'https://github.com/johndoe'),
    new Token('repo_url', 'https://github.com/johndoe/greet'),
    new Token('git_url', 'https://github.com/johndoe/greet.git'),
    new Token('keywords', ['foo', 'bar']),

    new Token('coverage', '95'),
    new Token('sig_coverage', '>'),
    new Token('node_version', '22'),
    new Token('license', 'MIT')
  ]
})

console.log(list.toTreeview())

await writeRepoToDir(join(import.meta.dirname, './tmp'), list.files)

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
