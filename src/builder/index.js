import { Token } from './classes/token/index.js'
import { FSConventions, writeRepoToDir } from './fs/index.js'
import { logger as console } from './console/index.js'

const createRepo = async ({ dir, tempDir }) => {
  const fsc = new FSConventions(dir)
  const repo = await fsc.create()

  console
    .list('conventions', repo.info())
    .log('\n')
    .info('Replacing tokens...')

  repo.replace([
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
  ])

  console
    .success()
    .info('Merging tokens ..')

  repo.group().merge()
  
  console.success()
    .info('Saving repo to ./tmp')
    .tree(repo.files)

  await writeRepoToDir(tempDir, repo.files)
  
  return repo
}

export { createRepo }
