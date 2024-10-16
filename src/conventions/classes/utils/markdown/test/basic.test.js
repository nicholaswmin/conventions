import test from 'node:test'

import { mergeMarkdown } from '../index.js'
import { markdowns } from './test-data/A-B.js'

test('#mergeMarkdown([markdown A, markdown B])', async t => {
  await t.test('passing 2 markdown strings', async t => {
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
    
    await t.test('includes the top heading', t => {
      const titleHeading = result.split('# Contributions').length - 1

      t.assert.strictEqual(titleHeading, 1)
    })
    
    await t.test('merges correctly', async t => {
      const lines = result.split('\n')

      await t.test('markdown B is embedded in markdown A', t => {
        t.assert.ok(result.includes('## Commit messages'), 
          'Cannot find ## Commit Messages header in output'
        )
      })
      
      await t.test('embedded once', t => {
        t.assert.strictEqual(result.split('## Commit messages').length - 1, 1)
      })

      await t.test('at correct position', async t => {
        const ccmIndex = lines.findIndex(l => l.includes('## Commit messages'))

        await t.test('below "Security" section', t => {
          const lines = result.split('\n')
  
          const secIndex = lines.findIndex(l => l.includes('## Security'))
    
          t.assert.ok(secIndex > -1, 'cannot find Security section')
          t.assert.ok(ccmIndex > secIndex, 'not below "Security" section')
        })
        
        await t.test('above "Authors" section', t => {
          const authorIndex = lines.findIndex(l => l.includes('## Authors'))

          t.assert.ok(authorIndex > -1, 'cannot find Authors section')
          t.assert.ok(ccmIndex < authorIndex, 'not above "Authors" section')
        })
      })
      
      await t.test('keeps the content marker', t => {
        const footnote = result.split('[^1]:').length - 1

        t.assert.strictEqual(footnote, 1)
      })
      
      await t.test('includes footnotes', t => {
        const footnote = result.split('[^1]:').length - 1

        t.assert.strictEqual(footnote, 1)
      })
      
      await t.test('links', async t => {
        await t.test('all links are at the bottom', async t => {
          await t.test('below "Footnotes" section', t => {
            const firstLinkIndex = lines.findIndex(l => l.includes(']:'))
            const footnotesIndex = lines.findIndex(l => l.includes('Footnotes'))
  
            t.assert.ok(footnotesIndex < firstLinkIndex, 'not below Footnotes')
          }) 
        }) 

        await t.test('strips duplicate links', t => {
          const author = result.split('[author-url]: https:').length - 1
  
          t.assert.strictEqual(author, 1)
        })
        
        await t.test('includes markdown A links', t => {
          const semver = result.split('[semver]: https:').length - 1
  
          t.assert.strictEqual(semver, 1)
        })
        
        await t.test('includes markdown B links', t => {
          const ccom = result.split('[ccom]: https:').length - 1
  
          t.assert.strictEqual(ccom, 1)
        })
      })
    })
  })
})
