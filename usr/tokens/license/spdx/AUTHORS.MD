# Authors

> This package contains code almost word-for-word from the project: 
> [spdx-expression-parse][spdxparse] which I have found, patched up 
> a little and reintroduced here as this project.
>
> It's meant for my use but might end up in my public repositories so
> out of respect to its original authors, I'm explaining a bit of 
> it's history here.

The original `MIT License` is included here & the entire copy of the
same license is included as header in all files copied from that project.

I make no claims of authorship. The authors do not know me or support me in
any way. 

> [!IMPORTANT]   
> Although full-within your rights to do so under the terms of the `MIT LICENSE`
> I would just request that you *do not ** republish this package as a 
> standalone module since I did not write it. If you do so, please ensure 
> you copy and correctly attribute in relevant places, the original authors 
> (inc. below).
>

---

## Original [`LICENSE`][orig-license]

```
 ---
 Copyright (c) 2015 Kyle E. Mitchell & other authors listed in AUTHORS

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be included
 in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 ---
```

---

## Original [`AUTHORS`][orig-authors]

```
 From [spdx-expression-parse][orig-authors]

 C. Scott Ananian <cscott@cscott.net (http://cscott.net)
 Kyle E. Mitchell <kyle@kemitchell.com (https://kemitchell.com)
 Shinnosuke Watanabe <snnskwtnb@gmail.com
 Antoine Motet <antoine.motet@gmail.com
```

---

## Original [`README`][orig-readme]


 This package parses [SPDX license expression](https://spdx.org/spdx-specification-21-web-version#h.jxpfx0ykyb60) strings describing license terms, like [package.json license strings](https://docs.npmjs.com/files/package.json#license), into consistently structured ECMAScript objects.  The npm command-line interface depends on this package, as do many automatic license-audit tools.

 In a nutshell:

 ```javascript
 var parse = require('spdx-expression-parse')
 var assert = require('assert')

 assert.deepEqual(
  // Licensed under the terms of the Two-Clause BSD License.
  parse('BSD-2-Clause'),
  {license: 'BSD-2-Clause'}
 )

 assert.throws(function () {
  // An invalid SPDX license expression.
  // Should be `Apache-2.0`.
  parse('Apache 2')
 })

 assert.deepEqual(
  // Dual licensed under either:
  // - LGPL 2.1
  // - a combination of Three-Clause BSD and MIT
  parse('(LGPL-2.1 OR BSD-3-Clause AND MIT)'),
  {
    left: {license: 'LGPL-2.1'},
    conjunction: 'or',
    right: {
      left: {license: 'BSD-3-Clause'},
      conjunction: 'and',
      right: {license: 'MIT'}
    }
  }
)
```

 The syntax comes from the [Software Package Data eXchange (SPDX)](https://spdx.org/), a standard from the [Linux Foundation](https://www.linuxfoundation.org) for shareable data about software package license terms.  SPDX aims to make sharing and auditing license data easy, especially for users of open-source software.

 The bulk of the SPDX standard describes syntax and semantics of XML metadata files.  This package implements two lightweight, plain-text components of that larger standard:

 1.  The [license list](https://spdx.org/licenses), a mapping from specific string identifiers, like `Apache-2.0`, to standard form license texts and bolt-on license exceptions.  The [spdx-license-ids](https://www.npmjs.com/package/spdx-license-ids) and [spdx-exceptions](https://www.npmjs.com/package/spdx-exceptions) packages implement the license list.  `spdx-expression-parse` depends on and `require()`s them.

    Any license identifier from the license list is a valid license expression:

    ```javascript
    var identifiers = []
      .concat(require('spdx-license-ids'))
      .concat(require('spdx-license-ids/deprecated'))
      .filter(function (id) { return id[id.length - 1] !== '+' })

    identifiers.forEach(function (id) {
      assert.deepEqual(parse(id), {license: id})
    })
    ```

    So is any license identifier `WITH` a standardized license exception:

    ```javascript
    identifiers.forEach(function (id) {
      require('spdx-exceptions').forEach(function (e) {
        assert.deepEqual(
          parse(id + ' WITH ' + e),
          {license: id, exception: e}
        )
      })
    })
    ```

 2.  The license expression language, for describing simple and complex license terms, like `MIT` for MIT-licensed and `(GPL-2.0 OR Apache-2.0)` for dual-licensing under GPL 2.0 and Apache 2.0.  `spdx-expression-parse` itself implements license expression language, exporting a parser.

    ```javascript
    assert.deepEqual(
      // Licensed under a combination of:
      // - the MIT License AND
      // - a combination of:
      //   - LGPL 2.1 (or a later version) AND
      //   - Three-Clause BSD
      parse('(MIT AND (LGPL-2.1+ AND BSD-3-Clause))'),
      {
        left: {license: 'MIT'},
        conjunction: 'and',
        right: {
          left: {license: 'LGPL-2.1', plus: true},
          conjunction: 'and',
          right: {license: 'BSD-3-Clause'}
        }
      }
    )
    ```

 This package differs slightly from the SPDX standard in allowing lower- and mixed-case `AND`, `OR`, and `WITH` operators:

 ```javascript
 assert.deepEqual(
  parse('MIT or BSD-2-Clause'),
  { left: { license: 'MIT' }, conjunction: 'or', right: { license: 'BSD-2-Clause' } }
 )
 assert.deepEqual(
  parse('GPL-2.0 with GCC-exception-2.0'),
  { license: 'GPL-2.0', exception: 'GCC-exception-2.0' }
 )
 ```

> The Linux Foundation and its contributors license the SPDX standard under the terms of [the Creative Commons Attribution License 3.0 Unported (SPDX: "CC-BY-3.0")](http://spdx.org/licenses/CC-BY-3.0).  "SPDX" is a United States federally registered trademark of the Linux Foundation.  The authors of this package license their work under the terms of the MIT License.

Also, the original [`package.json`][orig-package].

Thanks,

[@nicholaswmin](https://github.com/nicholaswmin)


[spdxparse]: https://github.com/jslicense/spdx-expression-parse.js
[orig-authors]: https://github.com/jslicense/spdx-expression-parse.js/blob/bb753f168e3364649eee90fb5d04e418e2d64d7b/AUTHORS
[orig-license]: https://github.com/jslicense/spdx-expression-parse.js/blob/bb753f168e3364649eee90fb5d04e418e2d64d7b/LICENSE
[orig-readme]: https://github.com/jslicense/spdx-expression-parse.js/blob/bb753f168e3364649eee90fb5d04e418e2d64d7b/README.md
[orig-package]: https://github.com/jslicense/spdx-expression-parse.js/blob/bb753f168e3364649eee90fb5d04e418e2d64d7b/package.json
