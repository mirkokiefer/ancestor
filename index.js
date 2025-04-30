import _ from 'underscore'
import async from 'async'

function Walker(startNode) {
  this.visited = []
  this.queue = [startNode]
}

Walker.prototype.merge = function(walker) {
  this.queue = _.union(this.queue, walker.queue)
}

export function lowestCommonAncestor(startNodes, readParents, cb) {
  if (startNodes.length < 2) return cb(null, startNodes[0])

  const walkerStack = startNodes.map(each => new Walker(each))

  function whileCond() {
    return _.some(walkerStack, walker => walker.queue.length)
  }

  async.whilst(
    whileCond,
    continueCb => {
      const walker = walkerStack.shift()
      if (walker.queue.length === 0) {
        walkerStack.push(walker)
        return continueCb()
      }

      const node = walker.queue.shift()
      const walkerWithCommonAncestor = _.find(
        walkerStack,
        other => _.contains(other.visited, node)
      )

      if (walkerWithCommonAncestor) {
        if (walkerStack.length === 1) return cb(null, node)
        walkerWithCommonAncestor.merge(walker)
        return continueCb()
      }

      walker.visited.push(node)
      readParents(node, (err, parents) => {
        walker.queue = walker.queue.concat(err ? [] : parents)
        walkerStack.push(walker)
        continueCb()
      })
    },
    cb
  )
}

export default lowestCommonAncestor