#Lowest Common Ancestor
[![Build Status](https://travis-ci.org/mirkokiefer/ancestor.png?branch=master)](https://travis-ci.org/mirkokiefer/ancestor)

[![NPM](https://nodei.co/npm/ancestor.png)](https://nodei.co/npm/ancestor/)

Find the lowest common ancestor for trees in JavaScript.

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

var readParents = function(id, cb) {
  cb(null, nodes[id])
}

findAncestor([9, 7], readParents, function(err, res) {
  // res = 5
})

```
