# Github API extensions
   
> API extensions should be added in this folder.  
> They are automatically registered and made available under `api.<name>`.

- **important:** Calling a sibling method **must** use it's namespace:   
  - Good: `this.foo.bar()` 
  - Bad: `this.bar()`
- Github API methods are available under `this.api`:  
    i.e `this.api.repos.delete` is the Github method for deleting a repository.
- Prefer reusing Github API names:  
  i.e create a `repos` API with a `repos.create` method combining    
  `this.api.repos.delete` & `this.api.repos.createForAuthenticated`   
  to create a method which overwrites if exisiting.   
- Use `this.repo.path` to avoid typing `{ repo, owner }` on each API call.

Format:

```
export default {
  name: 'foo',
  bar() { },
  baz() { }
}
```

> **note:** must `export default` 

Full example:

```js
// foo.js

export default {
  name: 'foo',
  async bar() {
    // Github APIs are namespaced under `this.api`
    this.api.repos.get(this.repo.path)
    
    // Sibling methods are 
    // namespaced under `this.<name>`
    this.repos.baz() // hello!
    
    // This won't work
    // this.baz()
  },
  
  async baz() {
    console.log('hello')
  }
}
```

## Authors

@nicholaswmin
