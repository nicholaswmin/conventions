const markdowns = [

  // Markdown A (with badge)

  '<!-- badge:start -->  \n' +
  '```badge\n' +
  '![Node Current][node-lts]\n' +
  '```\n' +
  '\n' +
  '# greet\n' +
  '\n' +
  '> a sample repo[^1]  \n' +
  '\n' +
  '- [Install](#install)\n' +
  '- [Example](#example)\n' +
  '- [Authors](#authors)\n' +
  '- [License](#license)\n' +
  '\n' +
  '## Install \n' +
  '\n' +
  '```bash\n' +
  'npm i @johndoe/greet\n' +
  '```\n' +
  '\n' +
  '## Example\n' +
  '\n' +
  '```js\n' +
  "import { greet } from '@johndoe/greet'\n" +
  '\n' +
  "const greeting = greet('John')\n" +
  '\n' +
  'console.log(greeting) \n' +
  "// 'Hello John'\n" +
  '```\n' +
  '\n' +
  '## API\n' +
  '\n' +
  '### `greet(name)`\n' +
  '\n' +
  '#### Parameters\n' +
  '\n' +
  '| name     | type     | description    | required |\n' +
  '|----------|----------|----------------|----------|\n' +
  '| `name`   | `string` | a persons name | yes      |\n' +
  '\n' +
  '#### Returns\n' +
  '\n' +
  '| name       | type     | description |    \n' +
  '|------------|----------|-------------|\n' +
  '| `greeting` | `string` | A greeting  | \n' +
  '\n' +
  '\n' +
  '<!--content:end-->\n' +
  '\n' +
  '\n' +
  '## Authors\n' +
  '\n' +
  '[@johndoe][author-url]  \n' +
  '\n' +
  '## License\n' +
  '\n' +
  'The [MIT License][license]  \n' +
  '\n' +
  '### Footnotes \n' +
  '\n' +
  '[^1]: Hello world, this is a footnote.\n' +
  '\n' +
  '[node-lts]: https://img.shields.io/node/v-lts/%40nicholaswmin%2Ffsm\n' +
  '[author-url]: https://github.com/johndoe\n' +
  '[license]: ./LICENSE\n',
  
  // Markdown B (with badge)

 '```badge\n' +
  '[![ccovt][cocov]](#tests)\n' +
  '```\n' +
  '```badge\n' +
  '[![ccovt][cocov]](#tests)\n' +
  '```\n' +
  '\n' +
  '## Tests\n' +
  '\n' +
  '> run unit tests:\n' +
  '\n' +
  '```bash\n' +
  'npm --run test\n' +
  '```\n' +
  '\n' +
  '[tests]: https://github.com/nicholaswmin/fsm/actions/workflows/tests:unit.yml\n' +
  '[cocov]: https://img.shields.io/badge/coverage-%3E%2095%25-blue\n' +
  '[ccovt]: https://github.com/nicholaswmin/fsm/blob/486a5f53d713a32fed01ee9d903bb66f90f9867a/package.json#L11\n',
]

export { markdowns }
