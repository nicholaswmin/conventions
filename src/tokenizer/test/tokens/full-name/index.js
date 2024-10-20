export default () => ({
  position: 1,

  async prompt({ salutation }) {
    return {
      type: 'text',
      description: 'enter your first & last name',
      minlength: 1,
      maxlength: 20,

      validate: val => {
        return /^[a-zA-Z ]*$/.test(val) || 'only: alphabetical(a-z) & spaces'
      },

      format: async val => ({ 
        first: val.split(' ')[0], 
        last: val.split(' ')[1]
      })
    }
  }
})
