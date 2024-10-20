import test from 'node:test'
import { join } from 'node:path'
import { createTestTokens } from '../index.js'

test('#TokenList placeholder replacement', async t => {
  const env = { location: { city: 'London' } }
  const list = await createTestTokens([
    'B',
    'John Doe'
  ])({ dir: join(import.meta.dirname, 'tokens'), env })
  
  const main = Object.freeze({
    content: `
      My payscale category is: <<payscale>>,
        Signde: Mr. <<signature>>. Oops!, I meant: Signed: Mr. <<signature>>
        
        Oh and my first name is: <<full-name.first>>. 
        Yes, you heard right, it is: <<full-name.first>> with a J.`
  })
  
  await t.test('token', async t => {    
    const sample = main
    const replaced = await list.replaceAll(sample.content)

    await t.test('has primitive value', async t => {    
      await t.test('replaces the 1st instance', async t => {    
        t.assert.ok(replaced.includes('Signde: Mr. Doe of London'), replaced)
      })
      
      await t.test('replaces a 2nd instance of same', t => {
        t.assert.ok(replaced.includes('Signed: Mr. Doe of London'), replaced)
      })
      
      await t.test('replaces 1st instance of another', t => {
        t.assert.ok(replaced.includes('category is: B'), replaced)
      })
    })
    
    await t.test('has complex/object value', async t => {    
      await t.test('replaces the 1st instance', t => {    
        t.assert.ok(replaced.includes('first name is: John'), replaced)
      })
      
      await t.test('replaces a 2nd instance', t => {
        t.assert.ok(replaced.includes('John with a J'), replaced)
      })
    })
  })
  
  await t.test('content has extra placeholders', async t => {
    const sample = Object.freeze({
      content: `
      ${main.content}
      <<country>>
      <<postcode>>`
    }) 

    await t.test('throws', async t => {    
      await t.test('an instanceof Error', t => {    
        return t.assert.throws(() => list.replaceAll(sample.content), { 
          name: 'Error' 
        })
      })

      await t.test('message lists all extra placeholders', t => {    
        return t.assert.throws(() => list.replaceAll(sample.content), {
          message: /<<country>>, <<postcode>>/ 
        })
      })
    })
  })
  
  await t.test('has no placeholders', async t => {
    const sample = Object.freeze({
      content: `Nothing to see here, except
      this newline! 
      Is this a tag: <not-a-tag>? No. Tags open & close with double-arrows (>)`
      .trim()
    }) 

    await t.test('does not throw', async t => {    
      t.assert.doesNotThrow(() => list.replaceAll(sample.content))
    })
    
    await t.test('preserves the content', async t => {    
      const lines = {
        sample: list.replaceAll(sample.content).split('\n'),
        replaced: sample.content.split('\n')
      }
      
      await t.test('preserves the linebreaks', async t => {    
        t.assert.strictEqual(lines.replaced.length, lines.sample.length)
      })
      
      await t.test('each line has unchanged content', async t => {    
        t.plan(3)

        lines.sample.forEach((sampleline, i) => {
          t.assert.strictEqual(lines.replaced[i], sampleline)
        })
      })
    })
    
    await t.test('has an unclosed opening tag', async t => {
      const sample = Object.freeze({
        content: `Hello <<world>.`.trim()
      }) 
      
      await t.test('does not throw', async t => {    
        t.assert.doesNotThrow(() => list.replaceAll(sample.content))
      })
      
      await t.test('does no replacements', async t => {  
        t.assert.strictEqual(list.replaceAll(sample.content), sample.content)
      })
    })
    
    await t.test('has an unopened closing tag', async t => {
      const sample = Object.freeze({
        content: `Hello world>>.`.trim()
      }) 
      
      await t.test('does not throw', async t => {    
        t.assert.doesNotThrow(() => list.replaceAll(sample.content))
      })
      
      await t.test('does no replacements', async t => {  
        t.assert.strictEqual(list.replaceAll(sample.content), sample.content)
      })
    })
  })
})
