const toTokenLinks = (acc, doc) => acc.concat(doc.links)
const toMDownLinks = ([key, value]) => `[${key}]: ${value.href}\n`
const dedupeLinks = (acc, links) => ({ ...acc, ...links })

export { toTokenLinks, toMDownLinks, dedupeLinks }
