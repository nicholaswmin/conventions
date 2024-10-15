// @TODO
//  - Fetch all tokens from Github.
//    - user might need to tokenize even if not creating a repo, in
//      which case most tokens will be missing.
//    - avoid keeping duplicate copies here that need to be synced. 
//  - pass required `repo` on `API` init.    
//    Keep `owner` optional in case repo is about to be created.
//  - this class might be unnecessary and removing it is probably best.

const quote = str => `"${str}"`

class Repo {
  constructor({ name, author = null }) {
    Object.defineProperties(this, {
      name: { value: name.trim(), enumerable: true },
      author: { 
        value: author.replace('@', ''), 
        configurable: true,
        writable: true,
        enumerable: true
      },
      author_url: { 
        enumerable: true,
        get() { return `https://github.com/${this.author}` }
      },
      repo_url: {
        enumerable: true,
        get() { return `${this.author_url}/${this.name}` }
      },
      git_url: {
        enumerable: true,
        get() { return `${this.repo_url}.git` }
      },
      homepage_url: {
        enumerable: true,
        get() { return `https://${this.author}.github.io/${this.name}` }
      }
    })
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
  setDetails({ description, node_version, keywords, coverage, license } = {}) {
    // @TODO verify, sanitize
    Object.defineProperties(this, {
      description:  { value: description,                   enumerable: true },
      node_version: { value: node_version,                  enumerable: true },
      keywords:     { value: keywords.map(quote).join(','), enumerable: true },
      coverage:     { value: coverage.toString(),           enumerable: true },
      sig_coverage: { value: +coverage < 100 ? '%3E' : '',  enumerable: true },
      node_version: { value: node_version,                  enumerable: true },
      license:      { value: license,                       enumerable: true }
    })
    
    return this
  }
  
  get path() { return { repo: this.name, owner: this.author } }

  get tokens() { 
    const toTokens = key => ({ 
      value: this[key],  key: `<<${key.split('_').join('-')}>>` 
    })

    return Object.keys(Object.getOwnPropertyDescriptors(this)).map(toTokens)
  }
}

export { Repo }
