export default function lowestCommonAncestor<T>(
  startNodes: T[],
  readParents: (id: T, cb: (err: Error | null, parents?: T[]) => void) => void,
  cb: (err: Error | null, res?: T) => void
): void