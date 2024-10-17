import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

const licensePath = join(import.meta.dirname, './spdx.json')

let _licenseCache = null

const load = async () => {
  if (_licenseCache)
    return _licenseCache

  const json = await readFile(licensePath, 'utf8')
  
  _licenseCache = JSON.parse(json).licenses
  
  return _licenseCache
}

const equalsIdLoose = id => ({ licenseId }) => 
  licenseId.toLowerCase() === id.toLowerCase()

const findByLicenseId = async id => (await load()).find(equalsIdLoose(id))

export { findByLicenseId }
