[![tests][testb]][tests] [![ccovt][cocov]](#tests)   

# <<name>>

> <<description>>[^1]  

- [Install](#install)
- [Example](#example)
- [API Docs](#api)
- [Contributors](#contributors)
  - [Test](#test)
  - [Publish](#publish)
- [Authors](#authors)
- [License](#license)

## Install 

```bash
npm i @<<author>>/<<name>>
```

## Example

> Basic 

```js
import { greet } from '@<<author>>/<<name>>'

const greeting = greet('John')

console.log(greeting) 
// 'Hello John'
```

## API

### `greet(name)`

#### Parameters

| name     | type     | description    | required |
|----------|----------|----------------|----------|
| `name`   | `string` | a persons name | yes      |

#### Returns

| name       | type     | description |    
|------------|----------|-------------|
| `greeting` | `string` | A greeting  | 


## Contributors

Read the [Contributions Guide][cnt-guide].

## Tests

> unit tests

```bash
node --run test
```

> **note**: these tests require meeting the [coverage thresholds][ccovt]

## Publishing

> create a [gh release][gh_rl], i.e:

```bash
gh release create 1.7.1
```

which auto-publishes to [`npm`][npmjs]

## Authors

[@<<author>>][author-url]  

## License

The [<<license>> License][license]  

### Footnotes 

[^1]: Hello world, this is a footnote.

[testb]: <<repo-url>>/actions/workflows/tests.yml/badge.svg
[tests]: <<repo-url>>/actions/workflows/tests.yml
[cocov]: https://img.shields.io/badge/coverage-<<sig-coverage>>%20<<coverage>>%25-blue
[ccovt]: <<repo-url>>/blob/main/package.json#L11

[npmjs]: https://www.npmjs.com/
[gh_rl]: https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases

[cnt-guide]: ./.github/CONTRIBUTING.md
[author-url]: <<author-url>>
[license]: ./LICENSE
