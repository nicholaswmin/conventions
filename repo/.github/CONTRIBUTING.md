# Contributions

> The key words `must`, `must not`, `required`, `shall`, `shall not`    
> `should`, `should not`, `recommended`, `may`, and `optional` in this   
> document are to be interpreted as described in [RFC 2119][rfc-2119]. 

- The runtime, source code & Github defaults are the *only* 1st-class citizens.    
  Anything else, including process & conventions are undesirable dependencies.  
- Dependencies *should* be lightweight, familiar to use & well-defined.
- A robust & well-defined test suite is more valuable than the code.
- Conciseness over verbosity. You don't need it.

## Publishing

> created as [Github Release][gh-rlese] & follow [SemVer][semver]:

> example: publishing a new release:

```bash
gh release create v1.7.1
```

List current releases:

```bash
gh release list
```

> note: versions must use format: `vX.X.X`.
  

## Branching

> follow [Github Flow][ghb-flow]:

1. Create a branch   
   Use a concise name, i.e: `increase-test-timeout`
2. Push code changes to the branch  
   Commit messages *must* follow [conventions](#commit-messages)
4. Create a pull request
5. Address review comments
6. When approved, merge the PR & delete the branch
.
> **note:** `default`/`main` branch *must* always
> exist in a working & deployable state.

## Commit messages

> follow [Conventional Commits v1][cc-about], requiring a format:

```bash
<type> <description>
```

- `<type>` *must* be any of: `fix:` or `feat:` or [specific others][cc-specs].
- `<description>` *must* be a short summary of code changes.

examples:

```bash
# good:
git commit -m"fix: array parsing issue with multiple spaces"

# bad: "Feat." is invalid. Use "feat:" or "fix:"
# bad: no space between keywords.
git commit -m"Feat.users can reset their password"
```

> **note:** breaking changes *must* consult the [specification][cc-specs],  
> which also includes additional, more specific formats.

## authors

> authors: [@<<owner>>][owner-url]

[semver]: https://semver.org/
[ghb-flow]: https://docs.github.com/en/get-started/using-github/github-flow
[cc-about]: https://www.conventionalcommits.org/en/v1.0.0/#summary
[cc-specs]: https://www.conventionalcommits.org/en/v1.0.0/#specification
[rfc-2119]: https://www.ietf.org/rfc/rfc2119.txt

[ps-build]: https://docs.npmjs.com/generating-provenance-statements
[npm-site]: https://www.npmjs.com/package/@nicholaswmin/fsm?activeTab=versions
[gh-rlese]: https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases

[owner-url]: <<owner-url>>
