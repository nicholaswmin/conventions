export default {
  name: 'repos',
  async create(...args) {
    this.repo.setDetails(...args)

    const deletion = await this.repos.exists() 
      ? await this.api.repos.delete(this.repo.path)
      : false

    const creation = await this.api.repos
      .createForAuthenticatedUser({ 
        name: this.repo.name,
        description: this.repo.description,
        homepage: this.repo.homepage_url,

        has_issues: true,
        has_projects: false,
        has_wiki: false,
        has_discussions: false,

        gitignore_template: 'Node',
        license_template: this.repo.license,
        
        allow_squash_merge: true,
        allow_rebase_merge: true,
        delete_branch_on_merge: true
      })

    return { deletion, creation }
  },
  
  async enablePrivateVulnerabilityReporting() {
    return await this.api.repos
      .enablePrivateVulnerabilityReporting(this.repo.path)
  },
  
  async addRulesets(rulesets) {
    const results = []

    for (const ruleset of rulesets) {
      results.push(await this.api.repos.createRepoRuleset({ 
        ...this.repo.path, 
        ...ruleset
      }))
    } 

    return results
  },
  
  async createPagesSite() {
    return await this.api.repos.createPagesSite({ 
      ...this.repo.path,
      source: { branch: 'main' }
    })
  },
  
  async addDocuments(documents) {
    const results = []

    for (const document of documents) {
      results.push({
        name: document.filename,
        ...await this.api.repos.createOrUpdateFileContents({
          ...this.repo.path,
          ...document.toUploadable(), 
          message: document.toCommitMessage()
        })
      })
    } 

    return results
  },
  
  async exists() {
    try {
      await this.api.repos.get(this.repo.path)  

      return true
    } catch (err) {
      if (err.status === 404)
        return false
      
      throw err
    }
  }
}
