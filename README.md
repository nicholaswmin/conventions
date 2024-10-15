# gh-good-repo

> A repository configurator  
> WIP

## Usage

Run: `node --run create`

- Flow: acquire token
- Creates a repo  
  - Sets configuation (code scanning, allow rebase etc)  
  - Adds:   
    - docs with repo-specific info(authors, URLs etc..)
    - workflows (`test`, `publish` etc ...)
    - rulesets
    - etc...
  
## notes

- Github API extensions are in: `./extensions`
- Repo assets are in: `./repo`
  - `Documents` can be tokenised   
    i.e: see "Author" section in `repo/README.md` for example.  
  - Keep same file directory structure as actual repo.
  
> see rulesets in `repo/rulesets` for currently supported conventions  

## todo

- [ ] Add tests
- [ ] Fix rulesets (waiting for Github support reply)
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

The [MIT License][license]

[owner-url]: https://github.com/nicholaswmin
[license]: ./LICENSE
