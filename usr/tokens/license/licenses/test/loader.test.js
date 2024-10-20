import test from 'node:test'
import { getLicenses } from '../index.js'

test('#getLicenses()', async t => {
  const licenses = await getLicenses()
  
  await t.test('fetches a result', t => {
    t.assert.ok(licenses, 'no result')
  })

  await t.test('is an array', t => {
    t.assert.ok(Array.isArray(licenses), typeof licenses)
  })

  await t.test('with about 5 - 15 licenses', t => {
    t.assert.ok(licenses.length >= 5, 'has less than 5 licenses')
    t.assert.ok(licenses.length <= 10, 'has more then 10 licenses')
  })
  
  await t.test('each has description', t => {
    licenses.forEach(license => {
      t.assert.ok(Object.hasOwn(license, 'description'), 'no "description" key')
      t.assert.strictEqual(typeof license.description, 'string')
      t.assert.ok(license.description.length, 'empty description')
    })
  })
  
  await t.test('each has localUrl', t => {
    licenses.forEach((license, i) => {
      t.assert.ok(Object.hasOwn(license, 'localUrl'), 'no "localUrl" key')
      t.assert.strictEqual(typeof license.localUrl, 'string')
      t.assert.ok(license.localUrl.length, 'empty localUrl')
    })
  })
  
  await t.test('each has id', t => {
    licenses.forEach(license => {
      t.assert.ok(Object.hasOwn(license, 'id'), 'no "id" key')
      t.assert.strictEqual(typeof license.id, 'string')
      t.assert.ok(license.id.length, 'empty id')
    })
  })
})
