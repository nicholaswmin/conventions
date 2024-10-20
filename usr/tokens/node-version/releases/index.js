import { 
  oneLTSReleasePerVersion, 
  oneReleasePerVersion,
  byDescSemVer
} from './utils.js'



const year = rel => (new Date(rel.date)).getFullYear().toString()
  // add padding to date so it doesn't jump around when scrolling,
  // through items with longer-than-usual semver tags.
  // 9 = max semver length, i.e: 'v99.99.99'
  // 4 = max year lengthy, i.e: "2040" 
  .padStart((9 + 4) - rel.version.length, ' ')

const toLatest = rel =>  ({ ...rel, description: 'latest' })

const toCurrent = version => ({ version, description: 'in-use' })

const toLTS = rel => rel.lts ? ({ 
  ...rel, description: `${year(rel)} LTS: ${rel.lts}` 
}) : rel

const listUsefulReleases = releases => {    
  return [
    toLatest(releases.at(0)), 
    toCurrent(`${process.version}`),
    ...releases.reduce(oneLTSReleasePerVersion, []),
    ...releases.reduce(oneReleasePerVersion,[])
    ]
    .sort(byDescSemVer)
    .map(toLTS.bind(toLTS))
}

export { listUsefulReleases }
