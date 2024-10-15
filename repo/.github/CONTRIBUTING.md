# Contributions

> The key words `must`, `must not`, `required`, `shall`, `shall not`    
> `should`, `should not`, `recommended`, `may`, and `optional` in this   
> document are to be interpreted as described in [RFC 2119][rfc-2119]. 

- [Keep it simple][kiss]. Anything else, [you don't need it][yagni].  
- The runtime, source code & Github defaults are the *only* 1st-class citizens.       
  Any 3rd-party modules, services & conventions are *undesirable* dependencies.
- A robust & well-defined test suite is more valuable than the source code.

## Publishing

> create a [Github Release][gh-relea]:

```bash
gh release create 1.7.1
```

> note: versioning *must* follow [Semver][semver], without a `v` prefix 

List current releases:

```bash
gh release list
```  

## Branching

> follows [Github Flow][ghb-flow], a lightweight model:

1. Create a branch.  
   Use a concise name, i.e: `increase-test-timeout`.
2. Push code changes to the branch.  
   Commit messages *must* follow [conventions](#commit-messages).
4. Create a pull request.
5. Address review comments.
6. When approved, merge the PR & delete the branch.

> **note:** `default`/`main` branch *must* always
> exist in a working & deployable state.

## Commit messages
 
> follow [Conventional Commits][cc-about], a convention dovetailing 
> with Semver.   

It prescribes the following format:

```bash
<type>: <description>
```

where:

- `<type>`: any of: `fix` or `feat` or [specific others][cc-specs].
- `<description>`: a short summary of code changes.

Commits with breaking changes *must* append `!` after `<type>`:

```bash
<type>!: <description>
```

### Examples

#### Non-breaking changes

```bash
# Good:
git commit -m"fix: array parsing issue with multiple spaces"

# Bad:
# "fixed" is invalid, use "feat" or "fix" postfixed with ":"
git commit -m"fixed array parsing issue with multiple spaces"

# Bad:
# missing a space between `<type>:` & `<description>`
git commit -m"fix: array parsing issue with multiple spaces"
```

#### Breaking changes

```bash
# Good:
git commit -m"feat!: mark 'name' as required parameter"

# Bad:
# "!" must come before ":", not after.
git commit -m"feat:! mark 'name' as required parameter"
```

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
