
var assert = require('assert')
var ancestor = require('./index')

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

/*
    4-5-8-9   
   /   \
1-2-3---6-7

*/

var readParents = function(id) {
  return nodes[id]
}
var findAncestor = function(startNodes) { return ancestor(startNodes, readParents) }

it('should find the most recent common ancestor', function() {
  var result = findAncestor([9, 7])
  assert.equal(result, 5)

  assert.equal(findAncestor([8, 6]), 5)
  assert.equal(findAncestor([9, 8, 7]), 5)
  assert.equal(findAncestor([9, 8, 7, 4]), 2) // could be 4 as well...
})