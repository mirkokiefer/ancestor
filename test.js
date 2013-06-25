
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

var readParents = function(id, cb) {
  cb(null, nodes[id])
}

var assertFindAncestor = function(startNodes, expected, cb) {
  ancestor(startNodes, readParents, function(err, res) {
    assert.equal(res, expected)
    cb()
  })
}

describe('find the most recent common ancestor', function() {
  var tests = [
    {start: [9, 7], expected: 5},
    {start: [9, 8, 7], expected: 5},
    {start: [9, 8, 7, 4], expected: 2},
  ]
  tests.forEach(function(each, i) {
    it('should find the common ancestor for test ' + i, function(done) {
      assertFindAncestor(each.start, each.expected, done)
    })
  })
})