# <<name>>

> <<description>>[^1]  

- [Install](#install)
- [Example](#example)
- [Authors](#authors)
- [License](#license)

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


<!--content:end-->


## Authors

[@<<author>>][author-url]  

## License

The [MIT License][license]  

### Footnotes 

[^1]: Hello world, this is a footnote.

[author-url]: <<author-url>>
[license]: ./LICENSE
