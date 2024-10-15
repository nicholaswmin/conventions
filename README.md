# conventional-repo

> A repository configurator  
> WIP

A `Convention` is as a self-contained folder with own:    
  - `workflows`
  - `repo-settings`
  - `rulesets` 
  - `documents`:   
    i.e `SECURITY.md` is a markdown section that gets   
    merged with other `SECURITY.md` fragments from other Aspects.   
    Then all are grouped under a main `SECURITY.md` etc ...

Running this against a folder `conventions` with multiple `Conventions`
should merge all appropriately and create a Github Repository with the 
appropriate file structure and configuration.
  
## Usage

```bash
node --run new --conventions=./conventions
```

### Flow

- Acquire Github token
- Merge conventions
- Create repo  
  
## Notes

- Github API extensions are in: `./extensions`
- The base convention is `base`
- Conventions can be ordered by prefixing their filename with a number:
  - i.e: `1-conventional-commits`, `2-github-flow`, etc...
 

## Todo

- [ ] Add tests
- [ ] Merge stuff
- [ ] Use the `--conventions` params
- [ ] Fix rulesets (waiting for Github support reply)

## Authors

[@nicholaswmin][author-url]

## License 

The [MIT License][license]

[author-url]: https://github.com/nicholaswmin
[license]: ./LICENSE
