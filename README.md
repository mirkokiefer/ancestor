#Most recent common ancestor
an implementation in javascript.

``` js
var findAncestor = require('ancestor')

var nodes = {
  1: [],
  2: [1],
  3: [2],
  4: [2],
  5: [4],
  6: [3, 5],
  7: [6],
  8: [5],
  9: [8]
}

/* the graph:

    4-5-8-9   
   /   \
1-2-3---6-7

*/

var readParents = function(id) {
  return nodes[id]
}

var result = findAncestor([9, 7], readParents)
// returns:
5
```
