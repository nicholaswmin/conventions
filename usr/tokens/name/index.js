export default () => ({
  position: 0,

  async prompt() {
    return {
      type: 'text',
      initial: 'foo-bar',
      description: 'package',
      minlength: 5,
      maxlength: 100, // https://github.com/evalEmpire/gitpan/issues/123
    
      format: v => v.split(' ').filter(v => v.trim()).join('-'),
    
      validate: v => /^[A-Za-z0-9._\- ]+$/.test(v) || (
        'only alphanumeric(foo123), hyphens(-) and commas(,)'
      )
    }
  }
})
