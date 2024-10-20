export default () => ({
  position: 2,

  async prompt() {
    return {
      type: 'text',
      description: 'description',
      initial: 'a package that... greets',

      minlength: 1,
      maxlength: 150,
        
      validate: v => /^[A-Za-z0-9.,'()` ]+$/.test(v) || (
        'only alphanumeric(abc123), spaces(  ), comma(,) & periods(.)'
      )
    }
  }
})
