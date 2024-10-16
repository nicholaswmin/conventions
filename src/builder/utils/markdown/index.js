import { marked } from 'marked'
import { toTOCs, buildTOC } from './src/toc.js'
import { toBadges, notBadge, hasMarker, spaceout } from './src/badges.js'
import { toTokenLinks, toMDownLinks, dedupeLinks } from './src/links.js'

// @TODO
// - throw on link conflict (same name, diff. url)
// - throw on invalid link (same name, diff. url)
// - throw on header conflict
// - missing marker?
// - add identifier comments start/end for pruning?

const mergeMarkdown = markdowns => {
  const enter = [{ type: 'space', raw: '\n\n' }]
  const eqWhitespace = str => str.replace(/(\r\n|\r|\n){2,}/g, '$1\n').trim()

  const toTokens = markdown => marked.lexer(markdown.trim())
  const parse = (acc, part, i) => acc += part.raw
  const merge = (acc, doc) => {
    acc.splice(acc.findIndex(hasMarker), 0, ...(enter).concat(doc))

    return acc
  }

  const docums = markdowns.map(toTokens)
  const badges = docums.reduce(toBadges, []).reduce(spaceout, []).concat(enter)
  const merged = docums.reduce(merge, []).filter(notBadge)
  const links  = Object.entries(docums.reduce(toTokenLinks, [])
    .reduce(dedupeLinks, {})).map(toMDownLinks).join('')
  const TOCs   = docums.reduce(toTOCs, []).map(buildTOC(merged))

  return eqWhitespace(badges.concat(merged).reduce(parse, '') + '\n\n' + links)
  
}

export { mergeMarkdown }
