
var _ = require('underscore')
var async = require('async')

function Walker(startNode) {
  this.visited = []
  this.queue = [startNode]
}
Walker.prototype.merge = function(walker) {
  this.queue = _.union(this.queue, walker.queue)
}

var mostRecentCommonAncestor = function(startNodes, readParents, cb) {
  if (startNodes.length < 2) return cb(null, startNodes[0])
  var walkers = startNodes.map(function(each) { return new Walker(each) })
  var walkerStack = walkers
  async.whilst(function() { return walkerStack.length }, function(continueCb) {
    var walker = walkerStack.shift()
    if (walker.queue.length == 0) {
      walkerStack.push(walker)
      return continueCb()
    }
    var node = walker.queue.shift()
    var walkerWithCommonAncestor = _.find(walkerStack, function(otherWalker) {
      return _.contains(otherWalker.visited, node)
    })
    if (walkerWithCommonAncestor) {
      if (walkerStack.length == 1) {
        return cb(null, node)
      } else {
        walkerWithCommonAncestor.merge(walker)
        continueCb()
      }
    } else {
      walker.visited.push(node)
      readParents(node, function(err, parents) {
        walker.queue = walker.queue.concat(parents)
        walkerStack.push(walker)
        continueCb()
      })
    }
  }, cb)
}

module.exports = mostRecentCommonAncestor