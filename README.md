# gh-good-repo

> A repository configurator  
> WIP

Run: `node --run new`

- Creates a repo  
- Sets configuation (code scanning, allow rebase etc)  
- Adds:   
  - docs with repo-specific info(authors, URLs etc..)
  - workflows (`test`, `publish` etc ...)
  - rulesets
  
*see rulesets in `repo/rulesets` for currently supported conventions  
*api abstractions over `octokit` are in `./apis`

## todo

- [ ] Fix hardcoded `auth` token in `octokit.js`
- [ ] Add tests 
- [ ] Supply `repo` externally
- [ ] Consider supplying "aspects":   
  : i.e *"Conventional Commits"* is an aspect,   
    as a self-contained folder with own:    
    - `document fragments`, i.e `CONTRIBUTING.md`,   
      merged with main `CONTTRIBUTING.md`
    - `rulesets` 
    - ... etc

## Authors

[@nicholaswmin][owner-url]

## License 

The [MIT License]

[owner-url]: https://github.com/nicholaswmin
[license]: ./LICENSE
