# Contributions

> The key words `must`, `must not`, `required`, `shall`, `shall not`    
> `should`, `should not`, `recommended`, `may`, and `optional` in this   
> document are to be interpreted as described in [RFC 2119][rfc-2119]. 

- [Keep it simple][kiss]. Anything else, [you don't need it][yagni].  
- The runtime, source code & Github defaults are the *only* 1st-class citizens.       
  Any 3rd-party modules, services & conventions are *undesirable* dependencies.
- A robust & well-defined test suite is more valuable than the source code.

## Publishing

> create a [Github Release][gh-relea], i.e:

```bash
gh release create 1.7.1
```

> note: versioning *must* follow [Semver][semver], without a `v` prefix 

List current releases:

```bash
gh release list
```  

## Branching

> follows [Github Flow][ghb-flow], a lightweight branching model.

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
 
> follow [Conventional Commits][cc-about], a convention dovetailing with Semver,   
> which prescribes the following format:

```bash
<type>: <description>
```

where:

- `<type>`: any of `fix` or `feat` or [specific others][cc-specs].
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

## Security 

> Contributors should read & abide by the following guidelines:

#### [Github Docs: Code Security][ghcs-wsite]
  
- [Quickstart for Repositories ][ghcs-quick]

#### [OSSF: Open Source Security Foundation][ossf-wsite]

- [Best Practices Guide: npm][ossf-npm-g]
- [Concise Guide for Developing Open Source Software][ossf-dev-g]
- [Concise Guide for Evaluating Open Source Software][ossf-dep-g]
- [Build Provenance][ossf-build]

## Authors

[@<<author>>][author-url]

[semver]: https://semver.org/
[pola]: https://en.wikipedia.org/wiki/Principle_of_least_astonishment
[kiss]: https://en.wikipedia.org/wiki/KISS_principle
[yagni]: https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it#

[ghb-flow]: https://docs.github.com/en/get-started/using-github/github-flow
[cc-about]: https://www.conventionalcommits.org/en/v1.0.0/#summary
[cc-specs]: https://www.conventionalcommits.org/en/v1.0.0/#specification
[rfc-2119]: https://www.ietf.org/rfc/rfc2119.txt

[ghcs-wsite]: https://docs.github.com/en/code-security
[ghcs-quick]: https://docs.github.com/en/code-security/getting-started/quickstart-for-securing-your-repository
[ossf-wsite]: https://openssf.org/
[ossf-npm-g]: https://github.com/ossf/package-manager-best-practices/blob/f51988aee8a9a1ab0436bbba61c1e94d7270683a/published/npm.md#readme
[ossf-score]: https://github.com/ossf/scorecard/blob/1bbae1ab91b1fbca1bf4c6e2307491d062a60cfb/README.md
[ossf-dep-g]: https://github.com/ossf/wg-best-practices-os-developers/blob/fe5ae8781b94c9b1c9e7cb9835ffffa7674ed510/docs/Concise-Guide-for-Evaluating-Open-Source-Software.md
[ossf-dev-g]: https://github.com/ossf/wg-best-practices-os-developers/blob/fe5ae8781b94c9b1c9e7cb9835ffffa7674ed510/docs/Concise-Guide-for-Developing-More-Secure-Software.md
[ossf-build]: https://github.com/ossf/wg-securing-software-repos/blob/8ccb8a6973beeea7c6bc42af0ef2854b2fa7af0d/docs/build-provenance-for-all-package-registries.md

[ps-build]: https://docs.npmjs.com/generating-provenance-statements
[npm-site]: https://www.npmjs.com/package/@nicholaswmin/fsm?activeTab=versions
[gh-relea]: https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases

[author-url]: <<author-url>>
