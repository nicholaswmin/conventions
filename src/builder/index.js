import { FSConventions, writeRepoToDir } from './fs/index.js'
import { logger as console } from './console/index.js'

const createRepo = async ({ dir, tempdir }, { tokens }) => {
  const fsc = new FSConventions(dir)
  const repo = await fsc.create()

  console
    .list('conventions', repo.info())
    .log('\n')
    .info('Replacing tokens...')

  repo.replace(tokens)

  console
    .success()
    .info('Merging tokens ..')

  repo.group().merge()
  
  console.success()
    .info('Saving repo to ./tmp')
    .tree(repo.files)

  //await writeRepoToDir(tempdir, repo.files)
  
  return repo
}

export { createRepo }
