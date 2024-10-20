import { readChunkFromNetRC } from './read-netrc/index.js'
import { parseChunkToEntry } from './parse-nrc-chunk.js'

const getNetRCEntry = async () => {
  try {
    const chunk = await readChunkFromNetRC()
    const entry = await parseChunkToEntry(chunk) 
    
    return entry
  } catch (err) {
    if (err.suggestedFix) 
      return console.warn(err.message)

    throw err
  }
}

console.log(await getNetRCEntry())
