import test from 'node:test'

import { mergeJSON } from '../index.js'
import { objects } from './test-data/A-B.js'

test('#mergeJSON([JSON A, JSON B])', async t => {
  await t.test('passing 2 JSONs', async t => {
    let result 
    
    t.before(() => {
      result = mergeJSON(objects)
    })
    
    await t.test('returns a result', t => {
      t.assert.ok(result)
    })
    
    await t.test('as an object', t => {
      t.assert.strictEqual(typeof result, 'object')
    })
    
    await t.test('structure is not malformed', async t => {
      const keys = Object.keys(result)

      await t.test('has correct keys', t => {
        t.assert.ok(['name', 'type', 'version'].every(key => key.includes(key)))
      })
      
      await t.test('has correct name', t => {
        t.assert.strictEqual(result.name, 'foobar')
      })
    })
    
    await t.test('merges flat changes correctly', async t => {
      await t.test('flat property is overwriten', t => {
        t.assert.strictEqual(result.author, '@bar')
      })
      
      await t.test('flat property is added', t => {
        t.assert.ok(Object.hasOwn(result, 'homepage'), 'license prop. missing')
        t.assert.strictEqual(result.license, 'MIT')
      })
    })
    
    await t.test('merges nested changes correctly', async t => {
      await t.test('nested property exists', t => {
        t.assert.ok(Object.hasOwn(result, 'scripts'), 'scripts prop. missing')
      })

      await t.test('overwriten with value from object B', t => {
        t.assert.strictEqual(result.scripts.test, 'node --test')
      })
      
      await t.test('added with value from object B', t => {
        t.assert.strictEqual(result.scripts.publish, 'npm publish')
      })
    })
  })
})
