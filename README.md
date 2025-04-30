# ancestor.js - Lowest Common Ancestor in JavaScript

![Test](https://github.com/mirkokiefer/ancestor/actions/workflows/test.yml/badge.svg)

![npm version](https://badge.fury.io/js/ancestor.svg)

Find the lowest-common-ancestor in a directed acyclic graph (DAG) for JavaScript & TypeScript.

## Install

```bash
npm install ancestor
```

## Usage

### ES Module

```js
import ancestor from 'ancestor'
```

### CommonJS

```js
const ancestor = require('ancestor')
```

#### Example

```js
const nodes = {1: [], 2: [1], 3: [2], 4: [2], 5: [4], 6: [3,5], 7: [6], 8: [5], 9: [8]}
const readParents = (id, cb) =>
  process.nextTick(() => cb(null, nodes[id] || []))

ancestor([9, 7], readParents, (err, res) => {
  console.log(res) // 5
})
```

## API

```ts
function lowestCommonAncestor<T>(
  startNodes: T[],
  readParents: (id: T, cb: (err: Error | null, parents?: T[]) => void) => void,
  cb: (err: Error | null, res?: T) => void
): void
export default lowestCommonAncestor
```

- **startNodes**: array of node IDs  
- **readParents**: callback-based fetch of parent IDs  
- **cb**: callback with error or the LCA ID  

## Test

```bash
npm test
```

## License

BSD

