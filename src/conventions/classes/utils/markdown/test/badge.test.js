import test from 'node:test'

import { mergeMarkdown } from '../index.js'
import { markdowns } from './test-data/A-B-badge.js'

test('#mergeMarkdown([markdown A, markdown B)', async t => {
  await t.test('passing 2 markdown strings, both with badges', async t => {
    let result, lines

    t.before(() => {
      result = mergeMarkdown(markdowns)

      lines = result.split('\n')
    })
    
    await t.test('returns a result', t => {
      t.assert.ok(result)
    })
    
    await t.test('as a string', t => {
      t.assert.strictEqual(typeof result, 'string')
    })

    await t.test('badges are moved to the top of the file', async t => {
      const line = lines.at(0)

      await t.test('existing top badge keeps its position', t => {
        const nodeBadge = line.split('[Node Current][node-lts]').length - 1
        t.assert.strictEqual(nodeBadge, 1)
      })

      await t.test('badges from other positions moved to the top', t => {
        const testBadges = line.split('[![ccovt][cocov]](#tests)').length - 1
        t.assert.strictEqual(testBadges, 2)
      })
      
      await t.test('badges should have 1 space between them', t => {
        const hasOneSpacing = line.includes(
          '[![ccovt][cocov]](#tests) [![ccovt][cocov]](#tests)'
        )
        
        t.assert.ok(hasOneSpacing, 'badges might not have 1 spacing')
      })
      
      await t.test('badges dont appear anywhere else', t => {
        const lineHasBadge = line => line.includes('[![ccovt][cocov]](#tests)')
        const occurences = lines.slice(1).filter(lineHasBadge).length

        t.assert.strictEqual(occurences, 0)
      })
    })
    
    await t.test('markdown A structure & content is intact', async t => {
      await t.test('markdown A links exists', t => {
        const liIndex = lines.findIndex(line => line.includes('[license]'))
        
        t.assert.ok(liIndex > -1, 'badge not below "[license]" not found')
      })

      await t.test('markdown A content exists', t => {
        const parametersHeading = lines.find(line => line.includes('## API'))
        t.assert.ok(parametersHeading, 'missing ## API section')
      })
    })

    await t.test('markdown A structure & content is intact', async t => {
      await t.test('markdown A links exists', t => {
        const liIndex = lines.findIndex(line => line.includes('[license]'))
        
        t.assert.ok(liIndex > -1, 'badge not below "[license]" not found')
      })

      await t.test('markdown A content exists', t => {
        const parametersHeading = lines.find(line => line.includes('## API'))
        t.assert.ok(parametersHeading, 'missing ## API section')
      })
    })
    await t.test('A & B links are merged', t => {
      const bdgLink = lines.slice(1).findIndex(line => line.includes('[cocov]'))
      
      t.assert.ok(bdgLink > -1, 'link "[cocov]" not found')
    })

    await t.test('all links set on the bottom', async t => {
      const lineHasLink = line => line.includes(']: https:')
      const firstLinkIndex = lines.slice(1).findIndex(lineHasLink)
      
      await t.test('after the "Footnotes" section', t => {
        const fnIndex = lines.findIndex(line => line.includes('Footnotes'))
        
        t.assert.ok(firstLinkIndex > fnIndex, '1st link not below "Footnotes"')
      })
    })
  })
})
