import { listUsefulReleases } from './releases/index.js'

export default () => ({
  position: 5,

  async prompt({ fetch }) {
    const rels = await fetch('https://nodejs.org/download/release/index.json')

    return {
      type: 'autocomplete',
      description: 'min. Node version',
      choices: listUsefulReleases(await rels.json()).map(release => {
        return {
          title: release.version,
          description: release.description
        }
      }),

      validate: val => {
        return (new RegExp('^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?$').test(val)) || 
          'Must follow format: x.x.x'
      },
      
      format: val => val.trim().replaceAll('v', '')
    }
  }
})
