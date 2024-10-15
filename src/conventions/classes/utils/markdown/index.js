import { marked } from 'marked'

// @TODO
// - throw on link conflict
// - throw on header conflict
// - TOC?
// - missing marker?
// - add identifier comments start/end for pruning?
const mergeMarkdown = (markdowns, marker = "content-end") => {
  const toMDTokens = markdown => marked.lexer(markdown)

  const space  = [{ type: 'space', raw: '\n' }]
  const tokens = markdowns.map(toMDTokens)

  const merge  = (acc, chunk) => {
    const index = acc.findIndex(token => token.raw.includes(marker))

    acc.splice(index, 0, ...chunk)

    return acc
  }

  const renderLinks  = (acc, [link, { href }]) => acc += `[${link}]: ${href}\n`
  const renderTokens = (acc, part) => acc += part.raw
  const collectLinks = (acc, chunk) => {
    const res = Object.assign({}, acc, chunk.links)
    delete chunk.links
    
    return res
  }
  

  const content = {
    main: Object.values(tokens).reduce(merge, [])
      .reduce(renderTokens, ''),
    links: Object.entries(Object.values(tokens).reduce(collectLinks, {}))
      .reduce(renderLinks, '')
  }
  
  return `${content.main}\n${content.links}`
}

export { mergeMarkdown }
