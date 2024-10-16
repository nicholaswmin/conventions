const isTOC    = token => isList(token) && token.items.every(isHLink)
const toTOCs   = (acc, doc) => [...acc, doc.filter(isTOC)].flat()
const isList   = token => token.type === 'list'
const isHLink  = token => token.text.includes('#')
const toTOCLi  = ({ text }) => `- [${condense(text)}](#${kebabify(text)})\n`
const isTOCH2  = token => token.type === 'heading' && token.depth === 2
const condense = str => str.replace(/ +/g, ' ').trim()
const kebabify = str => str.trim().toLowerCase().replace(/ +/g, '-')
const buildTOC = doc => toc => Object.assign(toc, {
  raw: doc.filter(isTOCH2).map(toTOCLi).join('')
})

export { toTOCs, buildTOC }
