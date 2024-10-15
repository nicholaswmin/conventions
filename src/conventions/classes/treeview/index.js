import { filePathsToTree, treeToString } from 'file-paths-to-tree'

const filesToTree = files => {
  return treeToString(filePathsToTree(files.map(file => file.path)))
}

export { filesToTree }
