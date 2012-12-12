
var _ = require('underscore')

function Walker(startNode) {
  this.visited = []
  this.queue = [startNode]
}
Walker.prototype.merge = function(walker) {
  this.queue = _.union(this.queue, walker.queue)
}

var mostRecentCommonAncestor = function(startNodes, readParents) {
  var walkers = startNodes.map(function(each) { return new Walker(each) })
  var walkerStack = walkers
  while (walkerStack.length) {
    var walker = walkerStack.shift()
    if (walker.queue.length == 0) {
      walkerStack.push(walker)
      continue
    }
    var node = walker.queue.shift()
    var walkerWithCommonAncestor = _.find(walkerStack, function(otherWalker) {
      return _.contains(otherWalker.visited, node)
    })
    if (walkerWithCommonAncestor) {
      if (walkerStack.length == 1) {
        return node
      } else {
        walkerWithCommonAncestor.merge(walker)        
      }
    } else {
      walker.visited.push(node)
      walker.queue = walker.queue.concat(readParents(node))
      walkerStack.push(walker)
    }
  }
}

module.exports = mostRecentCommonAncestor