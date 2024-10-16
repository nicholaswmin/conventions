## Commit messages
 
> follow [Conventional Commits][cc-about] which dovetails with [Semver][semver] 
> and follows this format:  

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


[semver]: https://semver.org/
[cc-about]: https://www.conventionalcommits.org/en/v1.0.0/
[cc-specs]: https://www.conventionalcommits.org/en/v1.0.0/#specification
