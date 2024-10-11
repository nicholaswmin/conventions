import { createOctokit } from './octokit.js'
import { Repo } from './classes.js'

class Base {
  constructor(octokit, repo) {
    this.octokit = octokit
    this.rest = octokit.rest
    this.repo = repo
  }
}

class CodeScanning extends Base {
  constructor(octokit, repo) {
    super(octokit, repo)
  }
  
  async turnOnDefaultSetup({ repo, owner }) {
    // on: 'configured'
    // off: 'not-configured'
    return this.rest.codeScanning
      .updateDefaultSetup({ ...this.repo.info, state: 'configured' })    
  }
}

class Repos extends Base {
  constructor(octokit, repo) {
    super(octokit, repo)
  }
  
  async create() {
    console.log('WOW', await this.exists())
    return {
      delete: await this.exists() 
        ? await this.rest.repos.delete(this.repo.info)
        : false,

      createForAuthenticatedUser: await this.rest.repos
        .createForAuthenticatedUser({ 
          name: this.repo.info.repo,
          description: this.repo.info.description,
          homepage: this.repo.info.repo_url,
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

      enablePrivateVulnerabilityReporting: await this.rest
        .repos.enablePrivateVulnerabilityReporting(this.repo.info)
    }
  }
  
  async addRulesets(rulesets) {
    const results = []

    for (const ruleset of rulesets) {
      results.push(await this.rest.repos.createRepoRuleset({ 
        ...this.repo.info, 
        ...ruleset
      }))
    } 

    return results
  }
  
  async addDocuments(documents) {
    const uploads = []

    for (const document of documents) {
      uploads.push(await this.rest.repos.createOrUpdateFileContents({
        ...this.repo.info,
        ...document.toUploadable(), 
        message: document.toCommitMessage()
      }))
    } 

    return uploads
  }
  
  async exists() {
    try {
      await this.rest.repos.get(this.repo.info)  

      return true
    } catch (err) {
      return err.status !== 404
    }
  }
}

class Api {
  constructor(token) {
    this.repos = null
    this.codeScanning = null
  }
  
  async init({ name, description }, npmMeta) {
    const octokit = createOctokit()
    const user = await octokit.rest.users.getAuthenticated()
    const repo = new Repo({ name, author: user.data, description }, npmMeta)
    
    // APIs
    this.repos = new Repos(octokit, repo)
    this.codeScanning = new CodeScanning(octokit, repo)
    
    return repo
  }
}

export { Api }
