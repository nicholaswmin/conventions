import test from 'node:test'
import { isPrimitive } from '../index.js'

test('#isPrimitive() arguments', async t => {
  await t.test('entry', async t => {
    await t.test('is missing', async t => {
      await t.test('throws Type Error', t => {
        t.assert.throws(() => {
          isPrimitive()
        }, { name: 'TypeError' })
      })
    })
    
    await t.test('is a primitive', async t => {
      await t.test('throws Type Error', t => {
        t.assert.throws(() => {
          isPrimitive(3)
        }, { name: 'TypeError' })
      })
    })
  
    await t.test('is an object', async t => {
      await t.test('throws Type Error', t => {
        t.assert.throws(() => {
          isPrimitive({ foo: 'bar' })
        }, { name: 'TypeError' })
      })
    })
    
    await t.test('is missing a key & value', async t => {
      await t.test('throws Type Error', t => {
        t.assert.throws(() => {
          isPrimitive(['foo'])
        }, { name: 'TypeError' })
      })
    })
  
    await t.test('is missing a value', async t => {
      await t.test('throws Type Error', t => {
        t.assert.throws(() => {
          isPrimitive([])
        }, { name: 'TypeError' })
      })
    })
  })
})

test('#isPrimitive() invalid values', async t => {  
  await t.test('has an array value', async t => {
    await t.test('throws Type Error', t => {
      t.assert.throws(() => {
        isPrimitive(['foo', ['bar', 'baz']])
      }, { name: 'TypeError'})
    })
  
    await t.test('error message', async t => {
      await t.test('includes key', t => {
        t.assert.throws(() => {
          isPrimitive(['foo', ['bar', 'baz']])
        }, { message: /foo / })
      })

      await t.test('indicates further nesting', t => {
        t.assert.throws(() => {
          isPrimitive(['foo', ['bar', 'baz']])
        }, { message: /flat object/ })
      })
    })
  })

  await t.test('has a complex-object value', async t => {
    await t.test('throws Type Error', t => {
      t.assert.throws(() => {
        isPrimitive(['foo', { bar: { baz: 3 } }])
      }, {
        name: 'TypeError'
      })
    })
    
    await t.test('error message', async t => {
      await t.test('includes path', t => {
        t.assert.throws(() => {
          isPrimitive(['foo', { bar: { baz: 3 } }])
        }, {
          message: /foo.bar/
        })
      })
      
      await t.test('does not indicate nesting', t => {
        t.assert.throws(() => {
          isPrimitive(['foo', { bar: { baz: 3 } }])
        }, {
          message: /boolean./
        })
      })
    })
  })
})

test('#isPrimitive valid values', async t => {
  await t.test('has a flat-object value', async t => {
    await t.test('does not throw', t => {
      t.assert.doesNotThrow(() => {
        isPrimitive(['foo', { foo: 'bar' }])
      })
    })
  })
  
  await t.test('has a number value', async t => {
    await t.test('does not throw', t => {
      t.assert.doesNotThrow(() => {
        isPrimitive(['foo', 3])
      })
    })
  })
  
  await t.test('has a string value', async t => {
    await t.test('does not throw', t => {
      t.assert.doesNotThrow(() => {
        isPrimitive(['foo', 'bar'])
      })
    })
    
    await t.test('has an empty string value', async t => {
      await t.test('does not throw', t => {
        t.assert.doesNotThrow(() => {
          isPrimitive(['foo', ''])
        })
      })
    })
  })
  
  await t.test('has a boolean value', async t => {
    await t.test('does not throw', t => {
      t.assert.doesNotThrow(() => {
        isPrimitive(['foo', true])
      })
    })
  })
})
