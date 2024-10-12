export default {
  name: 'repos',
  async create(...args) {
    const deletion = await this.repos.exists() 
      ? await this.rest.delete(this.repo.path)
      : false

    const creation = await this.rest.repos
      .createForAuthenticatedUser({ 
        name: this.repo.name,
        description: this.repo.description,
        homepage: this.repo.repo_url,

        has_issues: true,
        has_projects: false,
        has_wiki: false,
        has_discussions: false,

        gitignore_template: 'Node',
        license_template: 'MIT',
        
        allow_squash_merge: true,
        allow_rebase_merge: true,
        delete_branch_on_merge: true
      })

    this.repo.update(...args)

    return { deletion, creation }
  },
  
  async enablePrivateVulnerabilityReporting() {
    return await this.rest.repos
      .enablePrivateVulnerabilityReporting(this.repo.path)
  },
  
  async addRulesets(rulesets) {
    const results = []

    for (const ruleset of rulesets) {
      results.push(await this.rest.repos.createRepoRuleset({ 
        ...this.repo, 
        ...ruleset
      }))
    } 

    return results
  },
  
  async addDocuments(documents) {
    const results = []

    for (const document of documents) {
      results.push(await this.rest.repos.createOrUpdateFileContents({
        ...this.repo.path,
        ...document.toUploadable(), 
        message: document.toCommitMessage()
      }))
    } 

    return results
  },
  
  async exists() {
    try {
      await this.rest.repos.get(this.repo.path)  

      return true
    } catch (err) {
      if (err.status === 404)
        return false
      
      throw err
    }
  }
}
