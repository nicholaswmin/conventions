import test from 'node:test'

import { mergeMarkdown } from '../index.js'
import { markdowns } from './test-data/TOC.js'

test('#mergeMarkdown([markdown A, markdown B])', async t => {
  await t.test('Markdown B merges a heading 2 to Markdown A', async t => {
    let result 
    
    t.before(() => {
      result = mergeMarkdown(markdowns)
    })
    
    await t.test('returns a result', t => {
      t.assert.ok(result)
    })
    
    await t.test('as a string', t => {
      t.assert.strictEqual(typeof result, 'string')
    })

    await t.test('adds new TOC entry', t => {
      t.assert.ok(
        result.includes(`- [Baz section](#baz-section)`), 
        'cannot find new "Baz section" TOC entry'
      )
    })
  })
})
