/* 
The MIT License

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
*/

import test from 'node:test'
import { parse } from '../index.js'

test('#parse', async t => {
  // The spec is unclear about tabs and newlines
  await t.test('forbids tabs and newlines', function () {
    t.assert.throws(function () { parse('MIT\t') })
    t.assert.throws(function () { parse('\nMIT') })
  })
  
  await t.test('allows many spaces', async t => {
    t.assert.deepStrictEqual(
      parse(' MIT'),
      { license: 'MIT' }
    )
  
    t.assert.deepStrictEqual(
      parse('MIT '),
      { license: 'MIT' }
    )
  
    t.assert.deepStrictEqual(
      parse('MIT  AND    BSD-3-Clause'),
      {
        left: { license: 'MIT' },
        conjunction: 'and',
        right: { license: 'BSD-3-Clause' }
      }
    )
  })
  
  await t.test('forbids spaces between a license-id and a following `+`', async t => {
    t.assert.throws(
      function () { parse('MIT +') },
      /Space before `\+`/
    )
  })
  
  await t.test('parses DocumentRefs and LicenseRefs', function () {
    t.assert.deepStrictEqual(
      parse('LicenseRef-something'),
      { license: 'LicenseRef-something' }
    )
  
    t.assert.deepStrictEqual(
      parse('DocumentRef-spdx-tool-1.2 : LicenseRef-MIT-Style-2'),
      { license: 'DocumentRef-spdx-tool-1.2:LicenseRef-MIT-Style-2' }
    )
  })
  
  // See the note in `parser.js`.
  await t.test('parses `AND`, `OR` and `WITH` with the correct precedence', function () {
    parse('MIT AND BSD-3-Clause AND CC-BY-4.0')
    
    t.assert.deepStrictEqual(
      parse('MIT AND BSD-3-Clause AND CC-BY-4.0'),
      {
        left: { license: 'MIT' },
        conjunction: 'and',
        right: {
          left: { license: 'BSD-3-Clause' },
          conjunction: 'and',
          right: { license: 'CC-BY-4.0' }
        }
      }
    )
  
    t.assert.deepStrictEqual(
      parse('MIT AND BSD-3-Clause WITH GCC-exception-3.1 OR CC-BY-4.0 AND Apache-2.0'),
      {
        left: {
          left: { license: 'MIT' },
          conjunction: 'and',
          right: { license: 'BSD-3-Clause', exception: 'GCC-exception-3.1' }
        },
        conjunction: 'or',
        right: {
          left: { license: 'CC-BY-4.0' },
          conjunction: 'and',
          right: { license: 'Apache-2.0' }
        }
      }
    )
  })
  
  await t.test('allows mixed-case `and`, `or`, and `with`', async t => {
    const variants = [
      'MIT and BSD-3-Clause or GPL-2.0 with GCC-exception-2.0',
      'MIT aNd BSD-3-Clause oR GPL-2.0 wITh GCC-exception-2.0',
      'MIT AnD BSD-3-Clause Or GPL-2.0 WitH GCC-exception-2.0'
    ]

    const result = {
      left: {
        left: { license: 'MIT' },
        conjunction: 'and',
        right: { license: 'BSD-3-Clause' }
      },
      conjunction: 'or',
      right: {
        license: 'GPL-2.0',
        exception: 'GCC-exception-2.0'
      }
    }

    for (let index = 0; index < variants.length; index++) {
      const variant = variants[index]
      t.assert.deepStrictEqual(parse(variant), result)
    }
  })
})
