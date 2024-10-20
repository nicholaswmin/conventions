# spdx

> Validate [`spdx`][spdx] expressions.

> [!IMPORTANT]  
> Looking for an `SPDX` validator? Please refer to the 
> [actual & original project][spdxparse].  
>
> This package is an almost entirely word-for-word code-copying 
> from the project [spdx-expression-parse][spdxparse] which I have found, 
> patched up a little and reintroduced here as this project.   
>
> All original files include their `MIT License` as a header.     
> The original license is also included in this project root.    
> The file [AUTHORS.md][authorsmd] at the root contains more details 
> plus the original projects documentation.

## Install

This package is not meant for 3rd party standalone use or publishing.
Hence no installation instructions are given. 

If you stumble upon thiS and want it, just copy/paste it;   
it's `MIT Licensed` by it's original authors and [by me][nicholaswmin].

## Usage

### `parse(source)`

```js
import parse from `spdx-validator/index.js`

parse('Apache 2')
// throws, since 'Apache 2' is 
// not a valid SPDX license

parse('Apache-2')
// no Error thrown
// prints the license
```

... you probably need this module to validate a bit 
more complex SPDX expressions, rather than regular license 
identifiers:

```js
parse('MIT AND BSD-3-Clause AAnD CC-BY-4.0')
// throws Error: Unexpected `A` at offset 21
```

if we correct the malformed `AAnD` into a proper `AND`:

```js
parse('MIT AND BSD-3-Clause AND CC-BY-4.0')
// no error thrown
```

## Test

```bash
node --test
```

### `validateLoose(source)`

This function does *not throw* .  
If there is an error, it attempts to return it as a `string`.    
It is useful for performing user-input validations.

If the `source` is valid `SPDX` it *explicitly* returns `true`, 
otherwise it returns a `string` explaining the error where possible.

It is called `validateLoose` because it allows some keywords, specified
in: `./no-validates.js` to always return valid, regardless of what the spec 
says; in other words it is *non-SDPX compliant*.

## Authors

The actual Authors are attributed in relevant places & detailed 
in [AUTHORS.md][authorsmd].

Repackaged as an `ESM` module [nicholaswmin],   
under the terms fo the [MIT License][license].

[spdx]: https://en.wikipedia.org/wiki/Software_Package_Data_Exchange  
[spdxparse]: https://github.com/jslicense/spdx-expression-parse.js
[nicholaswmin]: https://github.com/nicholaswmin
[license]: ./LICENSE
[authorsmd]: ./AUTHORS.md
