const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class Heap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }
  getLeftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }
  getRightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
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
  top() {
    return this.heap[0] ?? null;
  }
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return value;
  }
  heapifyDown() {
    let cur = 0;
    while (this.hasLeftChild(cur)) {
      const nextIsRight =
        this.hasRightChild(cur) &&
        this.compare(
          this.heap[this.getRightChildIndex(cur)],
          this.heap[this.getLeftChildIndex(cur)]
        ) < 0;
      const nextChild = nextIsRight
        ? this.getRightChildIndex(cur)
        : this.getLeftChildIndex(cur);

      if (this.compare(this.heap[cur], this.heap[nextChild]) < 0) break;

      this.swap(cur, nextChild);
      cur = nextChild;
    }
  }
  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }
  heapifyUp() {
    let cur = this.heap.length - 1;
    while (
      this.hasParent(cur) &&
      this.compare(this.heap[cur], this.heap[this.getParentIndex(cur)]) < 0
    ) {
      this.swap(cur, this.getParentIndex(cur));
      cur = this.getParentIndex(cur);
    }
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}

function solution(N, M, edge) {
  const S = 1;
  const T = 2;
  const DISTANCE = 1;

  const graph = Array.from(Array(N + 1), () => []);
  const minHeap = new Heap((a, b) => a[DISTANCE] - b[DISTANCE]);
  const distance = Array(N + 1).fill(Infinity);
  const dp = Array(N + 1).fill(0);

  edge.forEach((row) => {
    const [A, B, C] = row.split(" ").map(Number);
    graph[A].push([B, C]);
    graph[B].push([A, C]);
  });

  minHeap.push([T, 0]);
  distance[T] = 0;
  while (!minHeap.isEmpty()) {
    const [cur, curDistance] = minHeap.pop();
    if (distance[cur] !== curDistance) continue;

    for (const [next, C] of graph[cur]) {
      if (distance[next] < curDistance + C) continue;

      distance[next] = curDistance + C;
      minHeap.push([next, distance[next]]);
    }
  }

  dp[T] = 1;
  const traversal = (cur) => {
    if (dp[cur] === 0) {
      for (const [next, C] of graph[cur]) {
        if (distance[next] >= distance[cur]) continue;
        dp[cur] += traversal(next);
      }
    }
    return dp[cur];
  };
  traversal(S);

  return dp[S];
}

const [N, M] = input.shift().split(" ").map(Number);
console.log(solution(N, M, input));
