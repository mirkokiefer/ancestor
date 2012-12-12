
var assert = require('assert')
var ancestor = require('./index')

var nodes = {
  1: {parents: []},
  2: {parents: [1]},
  3: {parents: [2]},
  4: {parents: [2]},
  5: {parents: [4]},
  6: {parents: [3,5]},
  7: {parents: [6]},
  8: {parents: [5]},
  9: {parents: [8]}
}

/*
    4-5-8-9   
   /   \
1-2-3---6-7

*/

var readParents = function(id) {
  return nodes[id].parents
}
var findAncestor = function(startNodes) { return ancestor(startNodes, readParents) }

it('should find the most recent common ancestor', function() {
  var result = findAncestor([9, 7])
  assert.equal(result, 5)

  assert.equal(findAncestor([8, 6]), 5)
})