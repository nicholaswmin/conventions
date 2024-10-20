/*
Authors: Nicholas Kyriakides   
@nicholaswmin

MIT Licensed

---

A list of IDs that bypass validation and are always assumed to be valid.

@WARNING

- This breaks the SPDX spec.
- This matches if the SPDIX **starts with** the following; it **does not** 
  have to be an *exact* match.

The SPDX spec does not provide an easy way to declare something as 
closed-source, all-rights-reserved or any of the sort. 

Nonetheless, `npm` allows settings `"UNLICENSED"` in `license` field of 
`package.json`.

We'll simply do the same, call the validator function `validateLoose` and call 
it a day.
*/

export default [
  "UNLICENSED",
  "SEE LICENSE IN"
]
