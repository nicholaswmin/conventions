[![tests][testb]][tests] [![ccovt][cocov]](#tests)   

# <<repo>>

> <<description>>[^1]  

- [Install](#install)
- [Example](#example)
- [Test](#test)
- [Authors](#authors)

## Install 

```bash
npm i @<<owner>>/<<repo>>
```

## Example

```js
import { greet } from '@<<owner>>/<<repo>>'

const hi = greet()

console.log(hi) 
// tada!
```

## API

### `greet(name)`

> Produces a *greeting* based on the given `name`

| name     | type     | desc.          | default  |
|----------|----------|----------------|----------|
| `name`   | `string` | an actual name | required |


## Tests

> unit tests:

```bash
node --run test
```

> tests *require* that certain [coverage thresholds][ccovt] are met.

## Contributing

Read the [Contributions Guide][cnt-guide].

## Authors

[@<<owner>>][owner-url]  

Licensed under: [<<license>>][license]  

## Notes 

[^1]: Hello world, this is a footnote.

[testb]: <<repo-url>>/actions/workflows/tests.yml/badge.svg
[tests]: <<repo-url>>/actions/workflows/tests.yml
[cocov]: https://img.shields.io/badge/coverage-%3E%2095%25-blue
[ccovt]: <<repo-url>>/blob/main/package.json

[cnt-guide]: ./.github/CONTRIBUTING.md
[owner-url]: <<owner-url>>
[license]: ./LICENSE
