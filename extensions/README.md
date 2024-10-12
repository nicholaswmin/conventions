# Github API extensions
   
> API extensions should be added in an `/extensions` folder in `root ./`; 
they are automatically registered and made available under `api.<name>`.

- **important:** Calling a Sibling method **must** use its namespace:  
  - Good: `this.foo.bar()` 
  - Bad: `this.bar()`
- Github API methods are available under `this.rest`:  
    i.e `this.rest.repos.delete` is the Github method for deleting a repository.
- Prefer reusing Github API names:  
  i.e create a `repos` API with a `repos.create` method combining    
  `this.rest.repos.delete` & `this.rest.repos.createForAuthenticated`   
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
    // Github APIs are namespaced under `this.rest`
    this.rest.repos.get(this.repo.path) // 
    
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
