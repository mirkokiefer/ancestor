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