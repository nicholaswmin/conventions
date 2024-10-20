import test from 'node:test'
import { join } from 'node:path'
import { createTestTokens } from '../index.js'

test('#createTokens token listing', async t => {
  const env = { location: { city: 'London' } }
  const list = await createTestTokens([
    'B',
    'John Doe'
  ])({ dir: join(import.meta.dirname, 'tokens'), env })
  
  await t.test('returns a result', async t => {
    t.assert.ok(list)
  })
  
  await t.test('a TokenList', async t => {
    t.assert.strictEqual(list.constructor.name, 'TokenList')
  })
  
  await t.test('lists the prompts', async t => {
    const prompts = await list.getPrompts({ env })
    
    await t.test('only prompts', async t => {
      t.assert.strictEqual(prompts.length, 2)
    })

    await t.test('sorted', async t => {
      t.assert.strictEqual(prompts[0].name, 'payscale')
      t.assert.strictEqual(prompts[1].name, 'full-name')
    })
  })
  
  await t.test('lists the tokens', async t => {
    const keys = Object.keys(list.sets)

    await t.test('in a list.sets property', async t => {
      t.assert.ok(!!list.sets, 'cannot find a list.sets property')
    })
    
    await t.test('lists full-name', async t => {
      t.assert.ok(keys.includes('full-name'), `list has: ${keys.join(', ')}`)
      
      await t.test('has value of prompted answer', async t => {
        t.assert.deepStrictEqual(list.sets['full-name'], {
          first: 'John',
          last: 'Doe'
        })
      })
    })
    
    await t.test('has payscale', async t => {
      t.assert.ok(keys.includes('payscale'), `list has: ${keys.join(', ')}`)
      
      await t.test('has value of prompted answer', async t => {
        t.assert.strictEqual(list.sets['payscale'], 'B')
      })
    })
    
    await t.test('has signature', async t => {
      t.assert.ok(keys.includes('signature'), `list has: ${keys.join(', ')}`)
      
      await t.test('has composited value of answers and env', async t => {
        t.assert.strictEqual(list.sets['signature'], 'Doe of London')
      })
    })
  })
})
