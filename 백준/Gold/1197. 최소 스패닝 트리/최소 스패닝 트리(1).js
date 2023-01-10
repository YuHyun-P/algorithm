// Prim algorithm
const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class PriorityQueue {
  constructor(compare) {
    this.heap = [];
    this.compare = (a, b) => Math.sign(compare(a, b));
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heap.length;
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heap.length;
  }

  hasParent(childIndex) {
    return 0 <= this.getParentIndex(childIndex);
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  top() {
    return this.heap[0] ?? null;
  }

  push(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  heapifyUp() {
    let cur = this.heap.length - 1;

    while (
      this.hasParent(cur) &&
      this.compare(this.heap[this.getParentIndex(cur)], this.heap[cur]) > 0
    ) {
      this.swap(cur, this.getParentIndex(cur));
      cur = this.getParentIndex(cur);
    }
  }

  pop() {
    if (this.heap.length === 0) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const result = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return result;
  }

  heapifyDown() {
    let cur = 0;
    let next = null;

    while (this.hasLeftChild(cur)) {
      const rightChildIsNext =
        this.hasRightChild(cur) &&
        this.compare(
          this.heap[this.getRightChildIndex(cur)],
          this.heap[this.getLeftChildIndex(cur)]
        ) <= 0;

      next = rightChildIsNext
        ? this.getRightChildIndex(cur)
        : this.getLeftChildIndex(cur);

      if (this.compare(this.heap[cur], this.heap[next]) <= 0) {
        break;
      }

      this.swap(cur, next);
      cur = next;
    }
  }
}

function solution(V, E, edge) {
  const graph = Array.from(Array(V + 1), () => []);
  edge.forEach(([u, v, weight]) => {
    graph[u].push([v, weight]);
    graph[v].push([u, weight]);
  });

  const pq = new PriorityQueue((a, b) => a[1] - b[1]);

  const inMst = Array(V + 1).fill(false);
  let mst = 0;

  inMst[1] = true;
  graph[1].forEach((adjacent) => pq.push(adjacent));

  for (let count = 0; count < V; count++) {
    while (!pq.isEmpty()) {
      const [u, min] = pq.pop();
      if (inMst[u]) {
        continue;
      }

      inMst[u] = true;
      mst += min;

      graph[u].forEach((adjacent) => pq.push(adjacent));
      break;
    }
  }
  return mst;
}

const [V, E] = input.shift().trim().split(" ").map(Number);
const edge = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(V, E, edge));
