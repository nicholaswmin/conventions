export default () => ({
  async composes(answers, { location }) {
    return `${answers['full-name'].last} of ${location.city}`
  }
})
