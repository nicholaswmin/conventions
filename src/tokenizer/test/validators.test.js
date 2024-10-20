import test from 'node:test'
import { join } from 'node:path'
import { createTestTokens } from '../index.js'

test('#createTokens prompt validators', async t => {
  const env = { location: { city: 'London' } }
  const list = await createTestTokens([
    'B', 'John Doe'
  ])({ dir: join(import.meta.dirname, 'tokens'), env })
  
  await t.test('allow valid values', async t => {
    const prompts = await list.getPrompts({ env })
    
    await t.test('only prompts', async t => {
      const prompt = prompts.find(prompt => prompt.name === 'full-name')

      await t.test('has a full-name promp', async t => {
        t.assert.ok(prompt, 'full-name token not found')
      })
      
      await t.test('lists a validate function', async t => {
        t.assert.ok(!!prompt.validate, 'no validate fn found')
      })
      
      await t.test('minlength', async t => {
        await t.test('set to 3', async t => {
          // @TODO not gonna work we need our extended validators
          const result = await prompt.validate('a')
          
          console.log(result)
        })
      })
    })
  })
})
