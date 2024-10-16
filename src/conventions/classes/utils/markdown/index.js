import { marked } from 'marked'

// @TODO
// - throw on link conflict (same name, diff. url)
// - throw on invalid link (same name, diff. url)
// - throw on header conflict
// - TOC?
// - missing marker?
// - add identifier comments start/end for pruning?

const mergeMarkdown = markdowns => {
  const space = [{ type: 'space', raw: ' '  }]
  const enter = [{ type: 'space', raw: '\n\n' }]

  const toTokens = markdown => marked.lexer(markdown.trim())

  const toTokenLinks = (acc, doc) => acc.concat(doc.links)
  const toMDownLinks = ([key, value]) => `[${key}]: ${value.href}\n`
  const dedupeLinks = (acc, links) => ({ ...acc, ...links })
  
  const hasMarker = token => token.raw.includes('content:end')
  const spaceout   = (acc, entry) => acc.concat(entry).concat(space)

  const sanitise = entry => Object.assign(entry, { raw: entry.text })
  const toBadges = (acc, doc) => [...acc, doc.filter(isBadge)
    .map(sanitise).reduce(spaceout, [])]
  const notBadge = entry => entry.lang !== 'badge'
  const isBadge  = entry => entry.lang === 'badge'

  const parse = (acc, part, i) => acc += part.raw
  const merge = (acc, doc) => {
    acc.splice(acc.findIndex(hasMarker), 0, ...(enter).concat(doc))

    return acc
  }

  const docums  = markdowns.map(toTokens)
  const badges  = docums.reduce(toBadges, []).reduce(spaceout, []).concat(enter)
  const merged  = docums.reduce(merge, []).filter(notBadge)
  const links   = Object.entries(docums.reduce(toTokenLinks, [])
    .reduce(dedupeLinks, {})).map(toMDownLinks).join('')

  return (badges.concat(merged).reduce(parse, '') + '\n\n' + links)
    .replace(/(\r\n|\r|\n){2,}/g, '$1\n').trim()
}

export { mergeMarkdown }
