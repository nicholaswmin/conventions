/**
* Performs a deep merge of objects and returns new object. 
* Does not modify objects (immutable) and merges arrays via concatenation.
*
* From: https://stackoverflow.com/a/48218209/1814486
* Authors: John Hildenbiddle
* Github: https://github.com/jhildenbiddle
*
* @param {...object} objects - Objects to merge
* @returns {object} New object with merged key/values
*/
function mergeJSON(objects = []) {
  const isObject = obj => obj && typeof obj === 'object';
  
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key]
      const oVal = obj[key]
      
      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal)
      }
      else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeJSON([pVal, oVal])
      }
      else {
        prev[key] = oVal
      }
    });
    
    return prev
  }, {})
}

export { mergeJSON }
