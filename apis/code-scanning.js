export default {
  name: 'codeScanning',

  async turnOnDefaultSetup() {
    // to turn-off: 'not-configured'
    return this.rest.codeScanning
      .updateDefaultSetup({ 
        ...this.repo.path,
        state: 'configured' 
      })    
  }
}
