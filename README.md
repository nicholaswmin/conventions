# gh-good-repo

> A repository configurator  
> WIP

Requires:

- an `extensions` folder with API extensions
- a `repo` folder with repo assets

both within the *current working* directory.

Run: `node --run new`

- Creates a repo  
- Sets configuation (code scanning, allow rebase etc)  
- Adds:   
  - docs with repo-specific info(authors, URLs etc..)
  - workflows (`test`, `publish` etc ...)
  - rulesets
  

## notes

- `repo` documents can be tokenised   
  i.e: see "Author" section in `repo/README.md` for example.  
- `repo` must keep same file directory structure as actual repo.
- see rulesets in `repo/rulesets` for currently supported conventions  

## todo

- [ ] Fix hardcoded `auth` token in `octokit.js`
- [ ] Add tests
- [ ] Reimplement `octokit` retry
- [x] Supply `repo` externally
  - fixed: uses `cwd` now.
- [ ] Consider `Aspects`, grouped together forming an `Opinion`:   
  : i.e *"Conventional Commits"* is an `Aspect`,   
    as a self-contained folder with own:    
    - `workflows`
    - `repo-settings`
    - `rulesets` 
    - `document fragments`:   
      i.e `CONTRIBUTING.md` is a markdown section that gets   
      merged with other `CONTTRIBUTING.md` fragments from other Aspects.   
      Then all are grouped under a main `CONTRIBUTING.md`  
    - ... etc

## Authors

[@nicholaswmin][owner-url]

## License 

The [MIT License]

[owner-url]: https://github.com/nicholaswmin
[license]: ./LICENSE
