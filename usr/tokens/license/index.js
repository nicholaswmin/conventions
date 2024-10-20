import { getLicenses } from './licenses/index.js'

export default () => ({
  position: 6,

  async prompt() {
    return {
      type: 'select',
      description: 'license',
      choices: (await getLicenses()).map(license => ({
        title: license.id,
        description: license.description,
        value: license
      }))
    }
  }
})
