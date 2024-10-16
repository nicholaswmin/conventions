// Original Code: File Paths To Trees
// From: https://github.com/alexgorbatchev/file-paths-to-tree
// 
// Copyright (c) 2021 Alex Gorbatchev
// 
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in 
// all copies or substantial portions of the Software.

import { styleText } from 'node:util'

const defaultOptions = {
  formatLabel: (node) => node.name,
  separator: "/",
  connectors: {
    tee: "├── ",
    elbow: "└── ",
    line: "│",
    padding: "   ",
  },
}

export function filePathsToTree(paths, options = {}) {
  const separator = options.separator || defaultOptions.separator
  const results = []
  return paths.reduce((currentResults, currentPath) => {
    const pathParts = currentPath.split(separator)
    const byPath = {}
    pathParts.reduce((nodes, name, index, arr) => {
      let node = nodes.find((node) => node.name === name)
      const path = arr.slice(0, index + 1).join(separator)
      const parentPath = arr.slice(0, index).join(separator)
      if (!node) {
        node = {
          name,
          path,
          parent: byPath[parentPath],
          children: [],
        }
        nodes.push(node)
      }
      byPath[path] = node
      return node.children
    }, currentResults)
    return currentResults
  }, results)
}
/**
 * Converts `Node[]` to a flat string.
 */
export function treeToString(nodes, options = {}, level = 0, prefix = "") {
  const nodesCount = nodes.length - 1
  const formatLabel = options.formatLabel || defaultOptions.formatLabel
  const connectors = options.connectors || defaultOptions.connectors
  const tee = connectors.tee || defaultOptions.connectors.tee
  const elbow = connectors.elbow || defaultOptions.connectors.elbow
  const line = connectors.line || defaultOptions.connectors.line
  let results = ""
  nodes.forEach((node, nodeIndex) => {
    let pointer = ""
    if (level > 0) {
      if (nodesCount > 0) {
        pointer = nodeIndex === nodesCount ? elbow : tee
      } else {
        pointer = elbow
      }
    }
    results += `${prefix + pointer + formatLabel(node)}\n`
    if (node.children?.length) {
      let newPrefix = prefix
      if (level > 0) {
        newPrefix += `${nodeIndex === nodesCount ? " " : line}   `
      }
      results += treeToString(node.children, options, level + 1, newPrefix)
    }
  })
  return results
}


const fileTree = files => {
  return `\n` + treeToString(filePathsToTree(files.map((file) => file.path)))
}

const log = console.log
const logger = Object.assign(console, {
  log: (...args) => {
    log(...args)
    
    return console
  },
  tree: files => {
    log(fileTree(files))
    
    return console
  },
  info: str => {
    log(styleText(['reset'], '- info: ' + str))
    
    return console
  },
  list: (title, arr) => {
    console.log(styleText(['blue'], title + ':'), '\n')

    arr.forEach(str => log(styleText(['reset'], ' - ' + str)))
      
    return console
  },
  success: (str = 'Success') => {
    log(styleText(['green'], '- info: ' + str))
    
    return console
  }
})

export { logger }
