# conventions

> Create repositories with pluggable `conventions`
> WIP

* [Overview](#overview)
  + [The `base convention`](#the--base-convention-)
  + [A `convention`](#a--convention-)
  + [Another `Convention`](#another--convention-)
* [Usage](#usage)
* [Flow](#flow)
* [Notes](#notes)
* [Todo](#todo)

## Overview

A CLI app that uses the [Github API][gapi] to create repositories.

The repositories are described as a list of pluggable, 
user-definable `conventions`.

A `convention` is a self-contained folder that describes a 
[coding convention][convention], e.g [conventional-commits][ccomits].

Each `convention` self-contains all the necessary:

- Any documents
  - [README.md][readme]
  - [guides][guides]
  - [policies][secpolic]
  - etc
- [rulesets][rulesets]
- [workflows][actions]
- configuration files 
- etc. 

to add that convention to the repository.

> example: a `base` plus 4 different `conventions`:

```
├─ conventions/
   ├─ base/
   ├─ unit-testing/
   ├─ conventional-commits/
   ├─ semver/
   ├─ github-flow/
```

### The `base convention` 

The `base convention` builds a minimally-working repository, 
hence it's always required:

```
├── base
  ├── .github
  │   ├── CONTRIBUTING.md    
  │   └── SECURITY.md    
  ├── rulesets
  │   └── protected-branch.json
  ├── src
  │   └── index.js
  ├── README.md
  └── package.json
```

### A `convention`

A convention is a *partial* repository structure with all the necessary  
documents and files to support the convention:

> example: A [Semver `convention`][semver]:

```
├── semver
   ├── .github
   │   ├── workflows
   │   │   └── npm-publish.yml
   │   └── CONTRIBUTING.md   
   └── rulesets
        └── semantic-tags.json
```

### Another `Convention`

> example: The [Conventional Commits `convention`][ccomits]:

```
├── conventional-commits
  ├── .github
  │   └── CONTRIBUTING.md    
  └── rulesets
    └── conventional-commits.json
```

## Usage

Run this CLI app and point to a `conventions` folder:

```bash
node --run new --conventions=./conventions
```

which should produce this repository:

```
.
└── repository
    ├── .github
    │   ├── workflows
    │   │   └── npm-publish.yml
    │   ├── CONTRIBUTING.md    
    │   └── SECURITY.md    
    ├── rulesets
    │   ├── protected-branch.json
    │   ├── conventional-commits.json
    │   └── semantic-tags.json
    ├── README.md
    └── package.json
```

This repository now supports:

- Semver:
  - a workflow to `publish.yml` to `npm` 
  - rulesets so tags can only use semantic versioning tag numbers
  - sections in `CONTRIBUTING` detailing this flow

- Conventional Commits:
  - rulesets so commits can only use conventional commit message formats
  - sections in `CONTRIBUTING` detailing this flow

## Flow

- Markdown documents (`README.md`, `CONTRIBUTING.md` etc...) are merged
- Rulesets are uploaded as-is
- Workflows are added as-is in the `.gitub/workflows/<workflow>.yml`
- `package.json` is merged
- All other documents are added as-is.
  
## Notes

- Github API extensions are in: `./extensions`
- The base convention is `base`
- Conventions can be ordered by prefixing their filename with a number:
  - i.e: `1-conventional-commits`, `2-github-flow`, etc...

## Todo

- [ ] Add tests
- [ ] Merge `Document`
- [ ] Merge `JSON`
- [ ] Use the `--conventions` params
- [ ] Fix rulesets (waiting for Github support reply)

## Authors

[@nicholaswmin][author-url]

## License 

The [MIT License][license]

[convention]: https://en.wikipedia.org/wiki/Coding_conventions#
[ccomits]: https://www.conventionalcommits.org/en/v1.0.0/
[semver]: https://semver.org/
[gapi]: https://docs.github.com/en/rest?apiVersion=2022-11-28

[rulesets]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets
[actions]: https://docs.github.com/en/actions/writing-workflows
[secpolic]: https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository
[readme]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes
[guides]: https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors

[author-url]: https://github.com/nicholaswmin
[license]: ./LICENSE
