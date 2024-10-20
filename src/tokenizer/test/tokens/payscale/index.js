export default () => ({
  position: 0,

  async prompt({ salutation }) {
    return {
      type: 'select',
      description: 'Your occupation',
      choices: [
        { title: 'CEO', description: 'does CEO-ing', value: 'A' },
        { title: 'Teacher', description: 'does teaching', value: 'B' },
        { title: 'Volunteer', description: 'does doctoring', value: 'C' }
      ]
    }
  }
})
