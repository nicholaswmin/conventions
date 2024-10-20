export default () => ({
  async composes({ author, name }) {
    return `https://github.com/${author}/${name}`
  }
})
