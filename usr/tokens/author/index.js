const noat = val => val.replaceAll('@', '')

export default () => ({
  position: 1,

  async prompt({ user }) {
    return {
      type: 'text',
      initial: user.username,
      description: 'author',
      minlength: 1,
      maxlength: 100, // https://github.com/evalEmpire/gitpan/issues/123

      validate: val => {
        return /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(noat(val)) ||
          'must be a Github username'
      },

      format: noat
    }
  }
})
