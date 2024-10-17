const computeMajorFromSemverString = str => str.trim()
  .toLowerCase().split('.').map(value => value.replaceAll('v', ''))
  .map(value => +value).at(0)

async function getLatestMajorVersion() {
  const result = await fetch('https://nodejs.org/download/release/index.json')

  if (!result.ok)
    throw new Error(`Response status: ${result.status}`)

  const versions = await result.json()

  return computeMajorFromSemverString(versions.at(0).version)
}

const getOwnMajorVersion = () => 
  computeMajorFromSemverString(process.version)

export { getLatestMajorVersion, getOwnMajorVersion }
