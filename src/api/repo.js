// @TODO
//  - Fetch all tokens from Github.
//    - user might need to tokenize even if not creating a repo, in
//      which case most tokens will be missing.
//    - avoid keeping duplicate copies here that need to be synced. 
//  - pass required `repo` on `API` init.    
//    Keep `owner` optional in case repo is about to be created.
// - this class might be unnecessary and removing it is probably best.

class Repo {
  constructor({ name }) {
    // Github metadata
    Object.defineProperty(this, 'name', { 
      value: name.trim(), enumerable: true 
    })
    // redefined strictly on `setOwner`
    this.owner = 'guest'
    this.description = null

    // npm metadata
    this.node_version = null
    this.license = null
  }
  
  update(ghSettings, npmSettings) {
    const settings = { ...ghSettings, ...npmSettings }
    const defined = function(key) { return typeof this[key] !== 'undefined' }

    Object.keys(this).filter(defined, settings).forEach(key => {
      this[key] = settings[key]
    })
  }
  
  setOwner({ data }) {
    delete this.owner
    Object.defineProperty(this, 'owner', { 
      value: data.trim(), enumerable: true 
    })
  }
  
  get tokens() { 
    const toTokens = ([ key, value ]) => ({
      value, key: `<<${key.split('_').join('-')}>>`
    })

    return Object.entries(this).map(toTokens)
  }
}

export { Repo }
