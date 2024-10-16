# conventions

\`\`\`badge  
foobar  
\`\`\`

> WIP  
> Create repositories with pluggable `conventions`   
> End goals is to match [scorecard][scorecard] checks in a plug/play manner.

* [Overview](#overview)
  * [A `convention`](#a-convention)
  + [Example A: Base `convention`](#the--base-convention-)
  + [Example B: Semver `convention`](#another--convention-)
  + [Example C: Conventional Commits `convention`](#another--convention-)
  + [Example D: unit-testing `convention`](#another--convention-)
  + [Example E: Whatever `convention`](#another--convention-)
* [Usage](#usage)
* [Flow](#flow)
* [Notes](#notes)
* [Todo](#todo)


## Overview

A CLI app that uses the [Github API][gapi] to create repositories.

The repositories are described as a list of pluggable, 
user-definable `conventions`.

> example: A `base` plus 4 different `conventions`:

```
├─ conventions/
   ├─ base/
   ├─ unit-testing/
   ├─ conventional-commits/
   ├─ semver/
   ├─ github-flow/
```

## A `convention`

A `convention` is a self-contained folder describing a general 
[convention][convention],   
for example: [*Conventional Commits*][ccomits].

It's a *partial* repository structure with all the necessary  
documents and files to support the convention:

Each `convention` self-contains all the necessary:

- Documents
  - [README.md][readme]
  - [guides][guides]
  - [policies][secpolic]
  - etc
- [rulesets][rulesets]
- [workflows][actions]
- configurations 
- etc. 

to add that convention to the repository.

### The `base convention` 

The `base convention` builds the minimally-working "skeleton" repository, 
hence it's always required:

```
base
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

### Example B: [Semver `convention`][semver]

adds:

- a [workflow][actions] to publish to `npm` automatically
- a [ruleset][rulesets] to restrict tag versioning to semver formatting
- a [CONTRIBUTING][guides] section to explain this convention

```
semver
├── .github
│   ├── CONTRIBUTING.md
│   └── workflows
│       └── npm-publish.yml
└── rulesets
    └── semantic-tags.json
```

### Example C: [Conventional Commits `convention`][ccomits]

adds:

- a [ruleset][rulesets] to restrict commit messages to follow the 
  prescribed format
- a [CONTRIBUTING][guides] section to explain this convention

```
conventional-commmits
├── .github
│   └── CONTRIBUTING.md
└── rulesets
    └── conventional-commits.json
```

### Example D: [unit-testing `convention`][ccomits]

adds:

- a `test` folder and a `basic.test.js` unit-test.
- a `package.json` that adds a line:
```json
"scripts": {
  "test": "node --test"
}
```

adds:

- a [workflow][actions] to run the unit tests on CI.
- a [ruleset][rulesets] to restrict merge of PRs only if unit-tests
  pass.
- a [CONTRIBUTING][guides] section to explain this convention


```
unit-testing
├── .github
│   ├── workflows
│   │   └── test.yml
│   └── CONTRIBUTING.md    
├── test
│   └── basic.test.js
├── rulesets
│   └── pr-status-checks.json
├── README.md
└── package.json
```

### Example E: [whatever `convention`][ccomits]

Conventions are user-definable so anything goes.

## Usage

Run this CLI app and point to a `conventions` folder:

```bash
node --run new --conventions=./conventions
```

which should produce this repository:

```
my-repo
├── .github
│   ├── workflows
│   │   ├── npm-publish.yml
│   │   └── test.yml
│   ├── CONTRIBUTING.md    
│   └── SECURITY.md    
├── test
│   └── basic.test.js
├── rulesets
│   ├── protected-branch.json
│   ├── conventional-commits.json
│   ├── pr-status-checks.json
│   └── semantic-tags.json
├── README.md
└── package.json
```

This repository now supports the following conventions/practices:

- [Semver][semver]:
  - a workflow to `publish.yml` to `npm` 
  - rulesets so tags can only use semantic versioning tag numbers
  - sections in `CONTRIBUTING` detailing this convention

- [Conventional Commits][ccomits]:
  - rulesets so commits can only use conventional commit message formats
  - sections in `CONTRIBUTING` detailing this convention
  
- [Unit tests][testing]:
  - Basic unit-tests runnable via `node --run test`
  - unit-tests that run on CI via a `test.yml` workflow
  - rulesets that require unit-tests passing before merge.
  - sections in `CONTRIBUTING` & `README` detailing this convention

## Flow

- Some files are merged by `section`, i.e markdown documents such as `README`.
- Other files are merged by `property`, i.e `package.json`
- Other files are left-intact and added side-by-side in the same folder,
  i.e `ruleset.json`, `workflows.yml` etc

## Notes

- Github API extensions are in: `./extensions`
- The base convention is `base`
- Conventions can be ordered by prefixing their filename with a number:
  - i.e: `1-conventional-commits`, `2-github-flow`, etc...
  
## Documents:

### Badges

Badges can be added by enclosing them as a codeblock with `lang:badge`.     
Badges get repositioned to the top of the page.

\`\`\`badge   
badge-goes-here  
\`\`\`

example:

\`\`\`badge    
![Static Badge][badgeurl]    
\`\`\`  

don't forget to add the link somehere in the doc.

[badgeurl]: https://img.shields.io/badge/foo-bar?label=foobar)

## Todo

- [ ] Add tests
- [ ] Merge `Document`
  - [ ] Has issues (dupe sections), rethink it
  - [ ] Allow sectional updates (badges etc)
      - Use 2 markers: 
        - `<--content:top-->`. Anything above this ends up in the corresponding
        top section of the `base` document, if such a marker exists.
        - `<--content:end-->`. Anything else just ends up above this marker.
- [x] Merge `JSON`
- [ ] Github Repo Settings, how to deal with?
- [ ] Generic files, what happens on conflict/merge, i.e: images? 
- [ ] Use the `--conventions` params
- [ ] Fix rulesets (waiting for Github support reply)

## Authors

[@nicholaswmin][author-url]

## License 

The [MIT License][license]

[scorecard]: https://github.com/ossf/scorecard/blob/main/docs/checks.md
[convention]: https://en.wikipedia.org/wiki/Coding_conventions#
[ccomits]: https://www.conventionalcommits.org/en/v1.0.0/
[semver]: https://semver.org/
[gapi]: https://docs.github.com/en/rest?apiVersion=2022-11-28

[rulesets]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets
[actions]: https://docs.github.com/en/actions/writing-workflows
[secpolic]: https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository
[readme]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes
[guides]: https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors
[testing]: https://en.wikipedia.org/wiki/Unit_testing

[author-url]: https://github.com/nicholaswmin
[license]: ./LICENSE
