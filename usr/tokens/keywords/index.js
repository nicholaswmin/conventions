export default () => ({
  position: 7,

  async prompt() {
    return {
      type: 'list',
      separator: ',',

      optional: true,
      description: 'repository keywords',

      validate: val => new RegExp('^[A-Za-z0-9, ]+$').test(val) || 'bad format',

      format: val => val ? val.map(keyword => `"${keyword}"`).join(', ') : ""
    }
  }
})
