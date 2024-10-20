export default () => ({
  async composes({ name, author }) {
    return `git@github.com:${author}/${name}.git`
  }
})
