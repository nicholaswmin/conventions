export default () => ({
  async composes({ author }) {
    return `https://github.com/${author}`
  }
})
