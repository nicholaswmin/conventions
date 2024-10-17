import { CompositeToken } from '../../../src/tokenizer/index.js'

class Repo_Url extends CompositeToken {
  
  static from({ name, author }) {
    return `https://github.com/${author}/${name}`
  }
}

export default Repo_Url
