const space = [{ type: 'space', raw: ' ' }]

const hasMarker = token => token.raw.includes('content:end')
const spaceout   = (acc, token) => acc.concat(token).concat(space)
const sanitise = token => Object.assign(token, { raw: token.text })
const toBadges = (acc, doc) => [
  ...acc, doc.filter(isBadge).map(sanitise).reduce(spaceout, [])
]
const notBadge = token => token.lang !== 'badge'
const isBadge  = token => token.lang === 'badge'

export { notBadge, toBadges, hasMarker, spaceout }
