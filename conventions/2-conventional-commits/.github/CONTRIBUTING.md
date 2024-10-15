## Commit messages
 
> follow [Conventional Commits][cc-about] which dovetails with Semver and 
> follows this format:

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
