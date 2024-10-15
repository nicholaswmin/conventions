[![tests][testb]][tests] [![ccovt][cocov]](#tests)   

# <<name>>

> <<description>>[^1]  

- [Install](#install)
- [Example](#example)
- [Test](#test)
- [Authors](#authors)

## Install 

```bash
npm i @<<author>>/<<name>>
```

## Example

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


## Tests

> unit:

```bash
node --run test
```

> **note**: certain [coverage thresholds][ccovt] must be met.

## Contributing

Read the [Contributions Guide][cnt-guide].

## Authors

[@<<author>>][author-url]  

Licensed under: [<<license>>][license]  

### Footnotes 

[^1]: Hello world, this is a footnote.

[testb]: <<repo-url>>/actions/workflows/tests.yml/badge.svg
[tests]: <<repo-url>>/actions/workflows/tests.yml
[cocov]: https://img.shields.io/badge/coverage-<<sig-coverage>>%20<<coverage>>%25-blue
[ccovt]: <<repo-url>>/blob/main/package.json#L11

[cnt-guide]: ./.github/CONTRIBUTING.md
[author-url]: <<author-url>>
[license]: ./LICENSE
