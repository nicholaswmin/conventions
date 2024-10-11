export default {
  name: 'repos',
  async create() {

    return {
      delete: await this.exists() 
        ? await this.rest.delete(this.settings.info)
        : false,

      createForAuthenticatedUser: await this.rest.repos
        .createForAuthenticatedUser({ 
          name: this.settings.info.repo,
          description: this.settings.info.description,
          homepage: this.settings.info.repo_url,

          has_issues: true,
          has_projects: false,
          has_wiki: false,
          has_discussions: false,

          gitignore_template: 'Node',
          license_template: 'MIT',
          
          allow_squash_merge: true,
          allow_rebase_merge: true,
          delete_branch_on_merge: true
        }),

      enablePrivateVulnerabilityReporting: await this.rest.repos
        .enablePrivateVulnerabilityReporting(this.settings)
    }
  },
  
  async addRulesets(rulesets) {
    const results = []

    for (const ruleset of rulesets) {
      results.push(await this.rest.repos.createRepoRuleset({ 
        ...this.settings, 
        ...ruleset
      }))
    } 

    return results
  },
  
  async addDocuments(documents) {
    const results = []

    for (const document of documents) {
      results.push(await this.rest.repos.createOrUpdateFileContents({
        ...this.settings.info,
        ...document.toUploadable(), 
        message: document.toCommitMessage()
      }))
    } 

    return results
  },
  
  async exists() {
    try {
      await this.rest.repos.get(this.settings.info)  

      return true
    } catch (err) {
      if (err.status === 404)
        return false
      
      throw err
    }
  }
}
