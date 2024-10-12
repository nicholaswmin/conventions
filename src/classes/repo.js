// @TODO
//  - Fetch all tokens from Github.
//    - user might need to tokenize even if not creating a repo, in
//      which case most tokens will be missing.
//    - avoid keeping duplicate copies here that need to be synced. 
//  - pass required `repo` on `API` init.    
//    Keep `owner` optional in case repo is about to be created.
//  - this class might be unnecessary and removing it is probably best.

class Repo {
  constructor({ name, author = null }) {
    Object.defineProperties(this, {
      name: { value: name.trim(), enumerable: true },
      author: { 
        value: author.replace('@', ''), 
        configurable: true,
        writable: true,
        enumerable: true
      }
    })
    
    console.log(this)
  }

  setAuthor({ user, author })  {
    if (typeof this.author !== 'undefined')
      delete this.author

    Object.defineProperties(this, {
      user: { value: user, enumerable: true },
      author: { value: author || user, enumerable: true }
    })

    return this
  }
  
  // after auth:
  //  - if repo exists, fill the rest
  //  - else wait until repo creation
  setDetails({ description, node_version, license } = {}) {
    Object.defineProperties(this, {
      description:  { value: description,  enumerable: true },
      node_version: { value: node_version, enumerable: true },
      license:      { value: license,      enumerable: true }
    })
    
    return this
  }
  
  get owner() {
    return this.author || 'guest'
  }

  get tokens() { 
    const toTokens = ([ key, value ]) => ({
      value, key: `<<${key.split('_').join('-')}>>`
    })

    return Object.entries(this).map(toTokens)
  }
}

export { Repo }
