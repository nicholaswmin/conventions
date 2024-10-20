export default () => ({
  position: 8,

  async prompt({ user }) {
    return {
      type: 'number',
      description: 'min. test coverage',

      initial: 95,
      min: 1,
      max: 100,
      increment: 1,
      
      format: val => val > 100 
        ? 100
        : val < 1 
          ? 1 
          : val

    }
  }
})
