// strictly speaking not a JSON, but ok..

const objects = [
  // JSON A
  {
    name: 'foobar',
    type: 'module',
    version: '0.1.0',
    description: 'a sample repo',
    exports: './src/index.js',
    engines: { node: '>=22' },
    scripts: { test: 'echo "Error: no test specified" && exit 1' },
    repository: { type: 'git', url: 'git+https://github.com/foo/greet.git' },
    keywords: [ 'foo', 'bar' ],
    author: '@foo',
    license: 'MIT',
    bugs: { url: 'https://github.com/foo/greet/issues' },
    homepage: 'https://github.com/foo/greet#readme'
  },
  
  // JSON B
  {
    license: 'MIT',
    author: '@bar',
    scripts: {
      publish: 'npm publish',
      test: 'node --test'
    }
  }
]

export { objects }
