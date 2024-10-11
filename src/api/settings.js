class Settings {
  constructor({ name, owner, description }, { node_version, license }) {
    // github metadata
    this.repo = name.trim()
    this.owner = (owner || 'guest').trim()
    this.description = description.trim()

    this.repo_url  = `https://github.com/${this.owner}/${this.name}`
    this.owner_url = `https://github.com/${this.owner}`
    
    // npm metadata
    this.node_version = node_version.trim().replace('v', '')
    this.license = license.trim()
  }
  
  setAuthenticatedOwner({ data }) {
    this.owner = data.trim()
  }

  get info() {
    return { repo: this.repo, owner: this.owner }
  }
  
  get tokens() { 
    const toTokens = ([ key, value ]) => ({
      value, key: `<<${key.split('_').join('-')}>>`
    })

    return Object.entries(this).map(toTokens)
  }
}

export { Settings }
