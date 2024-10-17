import { FSRepo } from './fs-repo/index.js'
import { treeview } from './console/index.js'

const createRepo = async ({ dir, tempdir }, { tokens }) => {
  const fsr = new FSRepo(dir)
  const repo = await fsr.get()

  repo
    .replace(tokens)
    .group()
    .merge()
  
  console.log(treeview(repo.files))

  await fsr.set({ dir: tempdir }, repo)
  
  return repo
}

export { createRepo }
