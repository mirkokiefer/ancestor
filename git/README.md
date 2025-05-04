## Additional Use Cases

### Finding LCA for Multiple Nodes

You can find the lowest common ancestor for more than two nodes:

```js
// Find the LCA for nodes 9, 8, and 7
ancestor([9, 8, 7], readParents, (err, res) => {
  console.log(res) // 5
})
```

### Using String IDs

Node IDs can be any type (not just numbers):

```js
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
  console.log(res) // 'root'
})
```

### Handling Non-existent Nodes

The library handles non-existent nodes gracefully:

```js
// When a node doesn't exist, the parents array will be empty
const readParentsWithError = (id, cb) => {
  process.nextTick(() => {
    if (!nodes[id]) return cb(new Error('Node not found'))
    cb(null, nodes[id])
  })
}

ancestor([9, 999], readParentsWithError, (err, res) => {
  if (err) console.error('An error occurred:', err)
  else console.log('LCA:', res)
})
```

### Using with Promises

Convert to Promise-based API using a wrapper:

```js
function findAncestor(startNodes, readParents) {
  return new Promise((resolve, reject) => {
    ancestor(startNodes, readParents, (err, res) => {
      if (err) reject(err)
      else resolve(res)
    })
  })
}

// Usage with async/await
async function findLCA() {
  try {
    const lca = await findAncestor([9, 7], readParents)
    console.log(lca) // 5
  } catch (err) {
    console.error(err)
  }
}
```