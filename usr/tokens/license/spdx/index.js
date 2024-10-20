/* 
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

import { InvalidFormatError } from './src/errors.js'
import novalidates from './no-validates.js'
import scan from './scan.js'
import _parse from './parse.js'

const parse = source => _parse(scan(source))

const validate = source => {
  if (typeof source !== 'string')
    throw new TypeError(`arg: source must be: string, got: ${typeof source}`)
  if (source.length < 1)
    throw new RangeError('arg: source cannot be empty')
  
  try {    
    const isSubsetOfNoValidate = novalidate => source.includes(novalidate)

    if (novalidates.some(isSubsetOfNoValidate))
      return true
    
    parse(source)
 
    return true
  } catch (err) {
    if (err instanceof InvalidFormatError)
      return err.message
    
    throw err
  }
}

export { validate, parse }
