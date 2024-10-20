import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const getLicenseJSON = async () => 
  await readFile(join(import.meta.dirname, './licenses.json'))

const getLicenses = async () => JSON.parse(await getLicenseJSON())

export { getLicenses }
