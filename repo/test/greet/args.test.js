import test from 'node:test'

import { greet } from '../../src/index.js'

test('#greet() no arguments', async t => { 
  await t.test('throws TypeError', t => {
    t.assert.throws(() => greet(), {
      name: 'TypeError',
      message: `'name' is required`
    })
  })
})

test('#greet(name) invalid: name', async t => { 
  await t.test('not a string', async t => {
    await t.test('throws TypeError', t => {
      t.assert.throws(() => greet(111), {
        name: 'TypeError',
        message: `'name' must be a string`
      })
    })
  })

  await t.test('is empty', async t => {
    await t.test('throws RangeError', t => {
      t.assert.throws(() => greet(''), {
        name: 'RangeError',
        message: `'name' cannot be empty`
      })
    })
  })
})
