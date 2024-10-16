const markdowns = [
  // Markdown A

  '# Contributions\n' +
    '\n' +
    '> The key words `must`, `must not`, `required`, `shall`, `shall not`    \n' +
    '> `should`, `should not`, `recommended`, `may`, and `optional` in this   \n' +
    '> document are to be interpreted as described in [RFC 2119][rfc-2119]. \n' +

    '## Security \n' +
    '\n' +
    '> Contributors should read & abide by the following guidelines:\n' +
    '\n' +
    '#### [Github Docs: Code Security][ghcs-wsite]\n' +
    '  \n' +
    '- [Quickstart for Repositories ][ghcs-quick]\n' +
    '\n' +
    '#### [OSSF: Open Source Security Foundation][ossf-wsite]\n' +
    '\n' +
    '- [Best Practices Guide: npm][ossf-npm-g]\n' +
    '- [Concise Guide for Developing Open Source Software][ossf-dev-g]\n' +
    '- [Concise Guide for Evaluating Open Source Software][ossf-dep-g]\n' +
    '- [Build Provenance][ossf-build]\n' +
    '\n' +
    '<!--content:end-->\n' +
    '\n' +
    '## Authors\n' +
    '\n' +
    '[@johndoe][author-url]\n' +
    '\n' +
    '[semver]: https://semver.org/\n' +
    '[done]: https://en.wikipedia.org/wiki/Unix_philosophy#Do_One_Thing_and_Do_It_Well\n' +
    '\n' +
    '[author-url]: https://github.com/johndoe\n' +
    '\n' +
    '### Footnotes \n' +
    '\n' +
    '[^1]: *Ideally*, a user - either standard or contributor - needs *zero* \n' +
    '      preparation to start working such as installing dependencies, \n' +
    '      reading documentation or getting accustomed to rules/conventions.\n', 
    
  // Markdown B
  '## Commit messages\n' +
  ' \n' +
  '> follow [Conventional Commits][ccom] which dovetails with Semver and \n' +
  '> follows this format:\n' +
  '\n' +
  '```bash\n' +
  '<type>: <description>\n' +
  '```\n' +
  '\n' +
  'where:\n' +
  '\n' +
  '- `<type>`: any of `fix` or `feat` or [specific others][cc-specs].\n' +
  '- `<description>`: a short summary of code changes.\n' +
  '\n' +
  'Commits with breaking changes *must* append `!` after `<type>`:\n' +
  '\n' +
  '```bash\n' +
  '<type>!: <description>\n' +
  '```\n' +
  '\n' +
  '### Examples\n' +
  '\n' +
  '#### Non-breaking changes\n' +
  '\n' +
  '```bash\n' +
  '# Good:\n' +
  'git commit -m"fix: array parsing issue with multiple spaces"\n' +
  '\n' +
  '# Bad:\n' +
  '# "fixed" is invalid, use "feat" or "fix" postfixed with ":"\n' +
  'git commit -m"fixed array parsing issue with multiple spaces"\n' +
  '\n' +
  '# Bad:\n' +
  '# missing a space between `<type>:` & `<description>`\n' +
  'git commit -m"fix: array parsing issue with multiple spaces"\n' +
  '```\n' +
  '\n' +
  '#### Breaking changes\n' +
  '\n' +
  '```bash\n' +
  '# Good:\n' +
  `git commit -m"feat!: mark 'name' as required parameter"\n` +
  '\n' +
  '# Bad:\n' +
  '# "!" must come before ":", not after.\n' +
  `git commit -m"feat:! mark 'name' as required parameter"\n` +
  '```\n' +
  '\n' +
  '[ccom]: https://www.conventionalcommits.org/en/v1.0.0/\n' +
  '[cc-specs]: https://www.conventionalcommits.org/en/v1.0.0/#specification\n'
]

export { markdowns }
