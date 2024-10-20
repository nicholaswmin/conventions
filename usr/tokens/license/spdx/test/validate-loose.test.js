import test from 'node:test'
import { validate } from '../index.js'

test('#validateLoose', async t => {
  await t.test('no arguments', async t => {
    await t.test('throws a descriptive TypeError', () => {
      t.assert.throws(() => validate(), {
        name: 'TypeError',
        message: /got: undefined/
      })
    })
  })
  
  await t.test('not a string', async t => {
    await t.test('throws a descriptive TypeError', () => {
      t.assert.throws(() => validate(3), {
        name: 'TypeError',
        message: /got: number/
      })
    })
  })
  
  await t.test('empty string', async t => {
    await t.test('throws a descriptive RangeError', () => {
      t.assert.throws(() => validate(''), {
        name: 'RangeError',
        message: /cannot be empty/
      })
    })
  })
  
  await t.test('is neither SPDIX License ID nor SPDIX expression', async t => {
    await t.test('does not throw', () => {
      t.assert.doesNotThrow(() => validate('foo'))
    })
    
    const result = validate('foo')
    
    await t.test('returns a string', () => {
      t.assert.strictEqual(typeof result, 'string')
    })
    
    await t.test('explains the error', () => {
      t.assert.ok(result, 'Unexpected `f` at offset 0')
    })
  })
  
  await t.test('is an SPDIX License ID', async t => {
    await t.test('in lowercase', async t => {
      await t.test('does not throw', () => {
        t.assert.doesNotThrow(() => validate('mit'))
      })
      
      const result = validate('mit')

      await t.test('returns a string', () => {
        t.assert.strictEqual(typeof result, 'string')
      })
      
      await t.test('explains the error', () => {
        t.assert.ok(result, 'Unexpected `f` at offset 0')
      })
    })
    
    await t.test('in uppercase', async t => {
      const result = validate('MIT')

      await t.test('returns Boolean', () => {
        t.assert.strictEqual(typeof result, 'boolean')
      })

      await t.test('equals: true', () => {
        t.assert.strictEqual(result, true)
      })
    })
  })
  
  await t.test('a "no-validates" value', async t => {
    await t.test('is exact match with an SPDX invalid "source"', async t => {
      await t.test('does not throw', () => {
        t.assert.doesNotThrow(() => validate('UNLICENSED'))
      })
      
      const result = validate('UNLICENSED')

      await t.test('returns Boolean', () => {
        t.assert.strictEqual(typeof result, 'boolean')
      })

      await t.test('equals: true', () => {
        t.assert.strictEqual(result, true)
      })
    })
    
    await t.test('is subset of an SPDX invalid "source"', async t => {
      await t.test('does not throw', () => {
        t.assert.doesNotThrow(() => validate('SEE LICENSE IN foo.doc'))
      })
      
      const result = validate('SEE LICENSE IN bar.doc')

      await t.test('returns Boolean', () => {
        t.assert.strictEqual(typeof result, 'boolean')
      })

      await t.test('equals: true', () => {
        t.assert.strictEqual(result, true)
      })
    })
  })
})
