# Contributions

> The key words `must`, `must not`, `required`, `shall`, `shall not`    
> `should`, `should not`, `recommended`, `may`, and `optional` in this   
> document are to be interpreted as described in [RFC 2119][rfc-2119]. 

- [Keep it simple][kiss]. Anything else, [you don't need it][yagni].  
- The runtime, source code & Github defaults are the *only* 1st-class citizens.       
  Any 3rd-party modules, services & conventions are *undesirable* dependencies.
- A robust & well-defined test suite is more valuable than the source code.

## Publishing

> *must* be created as a [Github Release][gh-relea] & follow [Semver][semver]:

> example: publishing a new release:

```bash
gh release create 1.7.1
```

> note: **must not** include a `v` prefix 

List current releases:

```bash
gh release list
```  

## Branching

> follow [Github Flow][ghb-flow]:

1. Create a branch.  
   Use a concise name, i.e: `increase-test-timeout`
2. Push code changes to the branch.  
   Commit messages *must* follow [conventions](#commit-messages)
4. Create a pull request
5. Address review comments
6. When approved, merge the PR & delete the branch
.
> **note:** `default`/`main` branch *must* always
> exist in a working & deployable state.

## Commit messages

> follow [Conventional Commits][cc-about], requiring a format:

```bash
<type> <description>
```

- `<type>` *must* be any of: `fix:` or `feat:` or [specific others][cc-specs].
- `<description>` *must* be a short summary of code changes.

examples:

```bash
# Good:
git commit -m"fix: array parsing issue with multiple spaces"

# Bad:
# - "feat." is invalid. Use "feat:" or "fix:"
git commit -m"feat. users can reset their password"

# Bad:
# - missing space between <type> & <description>.
git commit -m"fix:array parsing..."
```

> **note:** breaking changes *must* consult the [specification][cc-specs], which 
> also includes more specific formats.

## Authors

> authors: [@<<author>>][author-url]

[semver]: https://semver.org/
[pola]: https://en.wikipedia.org/wiki/Principle_of_least_astonishment
[kiss]: https://en.wikipedia.org/wiki/KISS_principle
[yagni]: https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it#

[ghb-flow]: https://docs.github.com/en/get-started/using-github/github-flow
[cc-about]: https://www.conventionalcommits.org/en/v1.0.0/#summary
[cc-specs]: https://www.conventionalcommits.org/en/v1.0.0/#specification
[rfc-2119]: https://www.ietf.org/rfc/rfc2119.txt

[ps-build]: https://docs.npmjs.com/generating-provenance-statements
[npm-site]: https://www.npmjs.com/package/@nicholaswmin/fsm?activeTab=versions
[gh-relea]: https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases

[author-url]: <<author-url>>
