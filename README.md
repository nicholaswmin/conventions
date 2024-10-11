# gh-good-repo

> A repository configurator  
> WIP (token is hardcoded)

Usage: `node index.js`

- Creates a repo  
- Sets configuation (code scanning, allow rebase etc)  
- Adds:   
  - docs with repo-specific info(authors, URLs etc..)
  - workflows (`test`, `publish` etc ...)
  - rulesets
  
The rulesets in `repo/rulesets` give a somewhat accurate picture of   
supported conventions

## todo

- [ ] Fix hardcoded `auth` token in `octokit.js`
- [ ] Add tests 
- [ ] supply `repo` externally
- [ ] consider supplying "aspects":   
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
