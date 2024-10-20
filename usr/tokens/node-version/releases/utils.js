const SV = { 
  // Semver
  split: str => str.replaceAll('v', '').split('.'),
  major: str => typeof str === 'string' ? Number(SV.split(str).at(0)) : 0
}

const matchesMajor = rel => r => (SV.major(r.version) === SV.major(rel.version))
const hasNoLTSOnSameMajor = rel => r => !matchesMajor(rel)(r) || !rel.lts

const oneLTSReleasePerVersion = (acc, rel, i, arr) => 
  rel.lts && acc.every(hasNoLTSOnSameMajor(rel))
    ? acc.concat(rel)
    : acc

const oneReleasePerVersion = (acc, rel, i, arr) => 
  SV.major(rel.version) > SV.major(arr[i + 1]?.version) 
  ? acc.concat(rel) 
  : acc

const byDescSemVer = (a, b) => {
  const numerify = version => Number(version.replaceAll('v', '').split('.')
    .map((part, i) => i > 0 ? part.padEnd(3, 0) : part)
    .join(''))
  
  return numerify(b.version) - numerify(a.version)
}

export { 
  oneLTSReleasePerVersion, oneReleasePerVersion, byDescSemVer
}
