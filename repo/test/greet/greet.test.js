import test from 'node:test'

import { greet } from '../../src/index.js'

test('#greet(name)', async t => {
  let result

  t.beforeEach(() => result = greet('John'))

  await t.test('returns', async t => {
    await t.test('a value', t => {
      t.assert.ok(result, `got falsy value: ${result}`)
    })
    
    await t.test('type: string', t => {
      t.assert.strictEqual(typeof result, 'string')
    })
  
    await t.test('format: Hello <name>', t => {
      t.assert.strictEqual(result, 'Hello John')
    })
  })
})
