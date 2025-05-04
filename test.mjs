
import assert from 'assert'
import ancestor from './index.js'

const nodes = {
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

const readParents = (id, cb) => {
  process.nextTick(() => {
    const parents = nodes[id]
    if (parents === undefined) return cb(new Error('node not found'))
    cb(null, parents)
  })
}

describe('find the most recent common ancestor', () => {
  const tests = [
    { start: [9, 7], expected: 5 },
    { start: [9, 8, 7], expected: 5 },
    { start: [9, 8, 7, 4], expected: 2 },
    { start: [3, 5], expected: 2 },
    { start: [1, 7], expected: 1 },
    { start: [4], expected: 4 },
    { start: [4, null], expected: undefined }
  ]

  tests.forEach(({ start, expected }, i) => {
    it(`test ${i}`, done => {
      ancestor(start, readParents, (err, res) => {
        assert.equal(res, expected)
        done()
      })
    })
  })
})

// Additional test cases
describe('additional use cases', () => {
  // Test case for string IDs
  it('should find LCA with string IDs', done => {
    const stringNodes = {
      'root': [],
      'level1-A': ['root'],
      'level1-B': ['root'],
      'level2-A': ['level1-A'],
      'level2-B': ['level1-B']
    }
    
    const readStringParents = (id, cb) =>
      process.nextTick(() => cb(null, stringNodes[id] || []))
    
    ancestor(['level2-A', 'level2-B'], readStringParents, (err, res) => {
      assert.equal(res, 'root')
      done()
    })
  })
  
  // Test case for promise-based API
  it('should work with promise-based API', async () => {
    // Promise wrapper for ancestor
    function findAncestor(startNodes, readParents) {
      return new Promise((resolve, reject) => {
        ancestor(startNodes, readParents, (err, res) => {
          if (err) reject(err)
          else resolve(res)
        })
      })
    }
    
    const lca = await findAncestor([9, 7], readParents)
    assert.equal(lca, 5)
  })
  
  // Test case for disconnected graphs
  it('should handle disconnected graphs', done => {
    const disconnectedNodes = {
      'A': [],
      'B': ['A'],
      'C': ['A'],
      'X': [],
      'Y': ['X'],
      'Z': ['X']
    }
    
    const readDisconnectedParents = (id, cb) =>
      process.nextTick(() => cb(null, disconnectedNodes[id] || []))
    
    // B and Z don't have a common ancestor as they're in different subgraphs
    ancestor(['B', 'Z'], readDisconnectedParents, (err, res) => {
      // The implementation should either return undefined or the first common node encountered
      // This assertion may need adjustment based on actual behavior
      assert.equal(res, undefined)
      done()
    })
  })
})
