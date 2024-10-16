import test from 'node:test'

import { mergeMarkdown } from '../index.js'
import { markdowns } from './test-data/A-B-badge.js'

test('#mergeMarkdown([markdown A, markdown B)', async t => {
  await t.test('multiple subsequent runs', async t => {
    let result, lines

    t.before(() => {
      result = mergeMarkdown(markdowns)
      result = mergeMarkdown([result, ...markdowns])
      result = mergeMarkdown([result, ...markdowns])

      lines = result.split('\n')
    })
    
    await t.test('returns a result', t => {
      t.assert.ok(result)
    })
    
    await t.test('as a string', t => {
      t.assert.strictEqual(typeof result, 'string')
    })

    await t.test('adds more badges to the top', async t => {
      const top = lines.slice(0, 10).join('')
      const badges = top.split('[![ccovt][cocov]](#tests)').length - 1

      t.assert.strictEqual(badges, 6)
    })
    
    await t.test('badges should have 1 space between them', t => {
      const hasOneSpacing = lines.at(0).includes(
        '[![ccovt][cocov]](#tests) [![ccovt][cocov]](#tests)'
      )
      
      t.assert.ok(hasOneSpacing, 'badges might not have 1 spacing')
    })
  })
})
